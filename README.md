# Makeable — Web oficial

Web de **Makeable Studio**: trofeos y medallas personalizadas en impresión 3D.
Construida con [Astro](https://astro.build) (óptima para SEO y velocidad).

## 🚀 Puesta en marcha

```bash
npm install       # instalar dependencias (solo la primera vez)
npm run dev       # servidor local en http://localhost:4321
npm run build     # generar la web para producción (carpeta dist/)
npm run preview   # previsualizar la build de producción
```

## 🗂️ Estructura

```
src/
  config/site.ts        ← ⭐ DATOS EDITABLES: contacto, precios, FAQ, navegación
  styles/global.css     ← colores, tipografía y estilos de marca
  layouts/BaseLayout    ← <head>, SEO, cabecera y pie
  components/           ← Logo, botones, tarjetas, galería, FAQ, etc.
  pages/                ← una página por archivo (.astro)
  assets/gallery/       ← ⭐ AQUÍ VAN TUS FOTOS (ver más abajo)
public/
  fonts/satoshi/        ← tipografía corporativa autoalojada
  brand/                ← logo oficial
  favicon.svg           ← isotipo del podio
```

## ✅ Cosas que tienes que completar (marcadas como PENDIENTE en el código)

1. **Fotos de la galería** → suelta tus imágenes en `src/assets/gallery/`.
   - Nombra los archivos de forma descriptiva para el SEO:
     `trofeo-padel-3d-azul.jpg`, `medallas-carrera-solidaria.jpg`, etc.
     (el nombre se usa como texto alternativo).
   - Aparecen automáticamente en la galería y en las páginas de producto.
   - Mientras no haya fotos, se muestran placeholders con el patrón del podio.

2. **Precios reales** → edita `priceTiers` en `src/config/site.ts`.
   Ahora hay números de EJEMPLO (medallas 6€, trofeos 25€, gama alta 40€, funko 35€).

3. **Formulario de presupuesto** → en `src/config/site.ts`, campo `forms.endpoint`.
   - Crea un formulario gratis en [Formspree](https://formspree.io), copia el endpoint
     (`https://formspree.io/f/xxxxxx`) y pégalo. Con eso recibirás los mensajes
     **con las imágenes adjuntas** en tu correo.
   - Si lo dejas vacío, el formulario abre el cliente de correo del usuario (plan B).

4. **Datos legales** → completa los `[PENDIENTE: ...]` en:
   `aviso-legal`, `politica-de-privacidad` (titular, NIF, domicilio fiscal).

5. **Dominio** → cuando lo tengas, cámbialo en `astro.config.mjs` (`SITE_URL`)
   y en `public/robots.txt`.

## 🎨 Identidad de marca (del Manual v1.0)

- **Azul:** `#52C4EA` · **Negro:** `#1A1A1A` · **Gris:** `#F5F5F5`
- **Tipografía:** Satoshi
- **Símbolo:** el podio 1·2·3

## 🔮 Fase 2 — Diseño con IA

La página `/diseno-con-ia` está preparada como "Próximamente" con captación de
lista de espera. Cuando quieras activarla, se conecta Claude (conversación) + un
modelo de imagen para generar propuestas de trofeos/medallas.

## 🌐 Publicación y lanzamiento

1. **Dominio:** recomendado `makeable.es` (señal geográfica España + confianza).
   Configúralo en `astro.config.mjs` (`SITE_URL`) y `public/robots.txt`.
2. **Hosting (gratis):** sube el repo a GitHub y conéctalo a
   [Vercel](https://vercel.com) (recomendado), [Netlify](https://netlify.com) o
   Cloudflare Pages. Detectan Astro solos. Luego apunta el dominio.

## 📊 Analítica (sin cookies) y SEO

- **Visitas sin banner de cookies:** edita `analytics` en `src/config/site.ts`.
  Elige proveedor y pega el token:
  - `provider: 'plausible'` + `domain` → dashboard sencillo (de pago o self-host).
  - `provider: 'cloudflare'` + `cloudflareToken` → **Cloudflare Web Analytics, gratis**.
  - `provider: 'umami'` + `umamiSrc` + `umamiWebsiteId` → self-host gratis.
  - Si usas Vercel, también puedes activar **Vercel Analytics** desde su panel.
- **Google Search Console** (imprescindible, gratis): verifica la propiedad y pega
  el código en `analytics.googleSiteVerification`. Te dirá qué busca la gente para
  encontrarte y cómo posicionas. Envía ahí el `sitemap-index.xml`.
