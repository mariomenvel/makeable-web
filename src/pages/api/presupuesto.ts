import type { APIRoute } from 'astro';
import { contact, mail, site } from '../../config/site';

// Se ejecuta on-demand (no se prerenderiza).
export const prerender = false;

const MAX_TOTAL_BYTES = 18 * 1024 * 1024; // margen para no superar el límite de email de Resend

/** Convierte un ArrayBuffer a base64 (compatible con el runtime de Cloudflare Workers y Node). */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  // btoa existe en Workers y en Node 16+
  return btoa(binary);
}

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export const POST: APIRoute = async ({ request, locals }) => {
  const json = (data: object, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  try {
    const form = await request.formData();

    // Anti-spam (honeypot): si viene relleno, fingimos éxito y no enviamos nada.
    if (form.get('_gotcha')) return json({ success: true });

    const nombre = String(form.get('nombre') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const telefono = String(form.get('telefono') ?? '').trim();
    const producto = String(form.get('producto') ?? '').trim();
    const cantidad = String(form.get('cantidad') ?? '').trim();
    const fecha = String(form.get('fecha') ?? '').trim();
    const mensaje = String(form.get('mensaje') ?? '').trim();
    const consentimiento = form.get('consentimiento');

    if (!nombre || !email || !mensaje) {
      return json({ success: false, message: 'Faltan campos obligatorios.' }, 400);
    }
    if (!consentimiento) {
      return json({ success: false, message: 'Debes aceptar la política de privacidad.' }, 400);
    }

    // Archivos adjuntos
    const rawFiles = form.getAll('imagenes[]').filter((f): f is File => f instanceof File && f.size > 0);
    let total = 0;
    for (const f of rawFiles) total += f.size;
    if (total > MAX_TOTAL_BYTES) {
      return json(
        { success: false, message: 'Los archivos adjuntos son demasiado grandes. Reduce el tamaño o envía menos.' },
        400
      );
    }
    const attachments = await Promise.all(
      rawFiles.map(async (f) => ({
        filename: f.name || 'adjunto',
        content: arrayBufferToBase64(await f.arrayBuffer()),
      }))
    );

    // Variables de entorno (Cloudflare runtime, Node o dev)
    const runtimeEnv = (locals as any)?.runtime?.env ?? {};
    const nodeEnv = typeof process !== 'undefined' ? process.env : ({} as Record<string, string>);
    const RESEND_API_KEY =
      runtimeEnv.RESEND_API_KEY || import.meta.env.RESEND_API_KEY || nodeEnv.RESEND_API_KEY;
    // Remitente: dominio verificado en Resend.
    const RESEND_FROM = mail.from;

    if (!RESEND_API_KEY) {
      return json(
        { success: false, message: 'El servicio de email aún no está configurado (falta RESEND_API_KEY).' },
        500
      );
    }

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.6">
        <h2 style="margin:0 0 12px">Nueva solicitud de presupuesto</h2>
        <table style="border-collapse:collapse;font-size:15px">
          <tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Nombre</td><td><strong>${esc(nombre)}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Email</td><td>${esc(email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Teléfono</td><td>${esc(telefono) || '—'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Producto</td><td>${esc(producto) || '—'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Cantidad</td><td>${esc(cantidad) || '—'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Fecha evento</td><td>${esc(fecha) || '—'}</td></tr>
        </table>
        <p style="margin:16px 0 4px;color:#6b6b6b">Mensaje</p>
        <p style="margin:0;white-space:pre-wrap">${esc(mensaje)}</p>
        <p style="margin:16px 0 0;color:#6b6b6b;font-size:13px">Adjuntos: ${attachments.length}</p>
      </div>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [contact.notifyTo],
        reply_to: email,
        subject: `Presupuesto web — ${nombre}${producto ? ` (${producto})` : ''}`,
        html,
        attachments,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return json({ success: false, message: 'No se pudo enviar el email.', detail }, 502);
    }

    // Autorespuesta al cliente (no bloquea: si falla, la solicitud igualmente se envió).
    try {
      const nombreCorto = esc(nombre.split(' ')[0] || nombre);
      const confirmHtml = `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.6;max-width:520px">
          <div style="background:#52c4ea;height:6px;border-radius:6px 6px 0 0"></div>
          <div style="padding:24px 4px">
            <h2 style="margin:0 0 12px">¡Gracias, ${nombreCorto}!</h2>
            <p style="margin:0 0 12px">Hemos recibido tu solicitud de presupuesto y te responderemos en <strong>24-48 h</strong> con una propuesta ajustada.</p>
            <p style="margin:0 0 12px;color:#6b6b6b">Esto es lo que nos has contado:</p>
            <p style="margin:0 0 16px;padding:12px 16px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap">${esc(mensaje)}</p>
            <p style="margin:0 0 4px">Mientras tanto, puedes ver más diseños en <a href="${site.url}/galeria" style="color:#1c8fbb">nuestra galería</a>.</p>
            <p style="margin:16px 0 0;color:#6b6b6b;font-size:13px">Si necesitas algo, responde a este correo o escríbenos por WhatsApp al ${esc(contact.phone)}.</p>
            <p style="margin:16px 0 0;font-weight:700">Makeable · Trofeos y medallas personalizadas</p>
          </div>
        </div>`;
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: [email],
          reply_to: contact.email,
          subject: '¡Hemos recibido tu solicitud! · Makeable',
          html: confirmHtml,
        }),
      });
    } catch {
      /* la autorespuesta es secundaria; ignoramos errores */
    }

    return json({ success: true });
  } catch (err) {
    return json({ success: false, message: 'Error inesperado procesando el formulario.' }, 500);
  }
};
