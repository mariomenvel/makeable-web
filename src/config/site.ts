/* ==========================================================================
   Configuración central de Makeable Studio
   Edita aquí datos de contacto, navegación, productos y precios.
   ========================================================================== */

export const site = {
  name: 'Makeable',
  legalName: 'Makeable Studio',
  // Cambia este dominio por el definitivo cuando lo tengas.
  url: 'https://www.makeable.es',
  tagline: 'Trofeos y medallas personalizadas',
  description:
    'Diseñamos y fabricamos trofeos y medallas personalizadas en impresión 3D. Piezas 100% únicas para tu torneo, liga o evento. Presupuesto sin compromiso y envíos a toda España.',
  founded: '2024',
} as const;

export const contact = {
  email: 'presupuestos@makeable.es', // email público (se muestra en la web)
  notifyTo: 'infomakeable@gmail.com', // a dónde llegan los avisos del formulario (directo, fiable)
  phone: '+34 656 603 147',
  phoneHref: '+34656603147',
  // WhatsApp usa el número sin símbolos ni espacios.
  whatsapp: '34656603147',
  instagram: 'https://www.instagram.com/makeablestudio',
  instagramHandle: '@makeablestudio',
  tiktok: 'https://www.tiktok.com/@makeablestudio',
} as const;

/* --------------------------------------------------------------------------
   FORMULARIO DE PRESUPUESTO
   Se envía a nuestra propia función serverless /api/presupuesto, que reenvía
   el mensaje (con las imágenes adjuntas) por email usando Resend.
   Necesita la variable de entorno RESEND_API_KEY (ver .env.example).
   Si dejas el endpoint vacío, el formulario abre el cliente de correo (plan B).
   -------------------------------------------------------------------------- */
export const forms = {
  endpoint: '/api/presupuesto',
} as const;

/* Remitente de los emails (dominio verificado en Resend) */
export const mail = {
  from: 'Makeable <presupuestos@makeable.es>',
} as const;

/* --------------------------------------------------------------------------
   ANALÍTICA (sin cookies — no necesita banner de consentimiento)
   Elige un proveedor y pega su token/dominio. Déjalo en '' para desactivar.
   - 'plausible'  -> usa `domain` (o self-host cambiando el src en Analytics.astro)
   - 'cloudflare' -> usa `cloudflareToken` (Cloudflare Web Analytics, gratis)
   - 'umami'      -> usa `umamiSrc` + `umamiWebsiteId`
   Y para Google Search Console, pega el código de verificación.
   -------------------------------------------------------------------------- */
export const analytics = {
  provider: '' as '' | 'plausible' | 'cloudflare' | 'umami',
  domain: 'makeable.es',
  cloudflareToken: '',
  umamiSrc: '',
  umamiWebsiteId: '',
  googleSiteVerification: 'h6gYonMCXIYj6PTUbR3rHQ9yMbcORAsFn0Xwk3cBMTY', // <meta> de Google Search Console
} as const;

export const location = {
  city: 'Sevilla',
  region: 'Andalucía',
  country: 'España',
  shipping: 'Envíos a toda España',
} as const;

export const nav = [
  { label: 'Trofeos', href: '/trofeos-personalizados' },
  { label: 'Medallas', href: '/medallas-personalizadas' },
  { label: 'Funko Pops', href: '/funko-pops-personalizados' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Precios', href: '/precios' },
  { label: 'Nosotros', href: '/nosotros' },
] as const;

/* --------------------------------------------------------------------------
   PRECIOS ORIENTATIVOS
   ⚠️ Números de EJEMPLO. Mario debe confirmar los importes reales.
   Cambia "from" (precio "desde", €/ud) y "note" según corresponda.
   -------------------------------------------------------------------------- */
export const priceTiers = [
  {
    id: 'medallas',
    name: 'Medallas 3D',
    from: 6,
    unit: '€ / ud',
    highlight: false,
    description: 'Personalizadas para tu evento. Cuanta más cantidad, mejor el precio por unidad.',
    features: [
      'Diseño 100% a tu medida',
      'Impresión 3D a color',
      'Cinta personalizada opcional (+0,70 €/ud)',
      'Ideales para participantes y finalistas',
    ],
  },
  {
    id: 'trofeos',
    name: 'Trofeos 3D',
    from: 25,
    unit: '€ / ud',
    highlight: true,
    description: 'Nuestro producto estrella (referencia: 20 cm). El precio por unidad baja con la cantidad.',
    features: [
      'Diseño exclusivo, nunca repetido',
      'Tamaños 15 · 20 · 25 · 30 cm',
      'Base con texto y datos del evento',
      'Podio 1·2·3 a juego',
    ],
  },
  {
    id: 'gama-alta',
    name: 'Trofeos gama alta',
    from: 30,
    unit: '€ / ud',
    highlight: false,
    description: 'Con base de cemento: más peso y sensación premium en la mano.',
    features: [
      'Base de cemento (mayor peso y presencia)',
      'Acabado premium para grandes campeonatos',
      'Suplemento de +5 €/ud sobre el trofeo estándar',
      'Misma personalización total',
    ],
  },
  {
    id: 'funko',
    name: 'Funko Pop personalizado',
    from: 39.9,
    unit: '€ / ud',
    highlight: false,
    description: 'Tu figura única, pintada a mano. El regalo original que no se olvida.',
    features: [
      'Diseño según tu idea o foto',
      'Pintado a mano, detalle a detalle',
      'Pieza única de coleccionista',
      'Ideal para regalos especiales',
    ],
  },
] as const;

/* Condiciones generales de precio */
export const pricing = {
  minOrder: 200, // pedido mínimo en €
  shippingIncluded: true, // envíos a toda España incluidos
} as const;

/* Ejemplos de pedidos reales (para dar confianza en la página de precios) */
export const examplePacks = [
  { name: '50 medallas 3D', detail: 'Personalizadas, para todos los participantes', price: 300, approx: false },
  { name: '6 trofeos de 20 cm', detail: 'Pack estándar, sin peso', price: 200, approx: false },
  { name: '12 trofeos de 20 cm', detail: 'Sin peso', price: 340, approx: true },
  { name: '25 trofeos de 20 cm', detail: 'Sin peso · mejor precio por unidad', price: 620, approx: false },
] as const;

/* Factores que influyen en el precio (para la página de precios) */
export const priceFactors = [
  { title: 'Cantidad', text: 'A más unidades, mejor precio por pieza. Un pedido de 25 trofeos sale mucho más a cuenta por unidad que uno de 6.' },
  { title: 'Tamaño', text: 'Trofeos en 15, 20, 25 y 30 cm. El diseño y el montaje son iguales; solo cambian el material y el tiempo de producción (aprox. un 25 % del precio).' },
  { title: 'Material y peso', text: 'Plástico estándar o gama alta con base de cemento, que aporta peso y presencia (+5 €/ud).' },
  { title: 'Personalización', text: 'Detalles del diseño y extras como la cinta personalizada de las medallas (+0,70 €/ud).' },
] as const;

export const faqs = [
  {
    q: '¿Cuánto cuesta un trofeo o medalla personalizada?',
    a: 'Depende del tamaño, la cantidad y el material. Como referencia real: 50 medallas salen por unos 300 € (6 €/ud) y los trofeos de 20 cm rondan entre 25 y 33 €/ud según cantidad (6 trofeos = 200 €, 25 trofeos = 620 €). Los envíos van incluidos y trabajamos pedidos desde 200 €. Con el formulario te damos una cifra ajustada en 24-48 h.',
  },
  {
    q: '¿En qué se diferencian de un trofeo o medalla genérica?',
    a: 'Cada pieza es única y se diseña desde cero para tu evento: forma, colores, texto y detalles propios. No compramos moldes en serie; imprimimos en 3D piezas que nadie más tiene. El ganador se lleva a casa un recuerdo con identidad, no un premio de catálogo.',
  },
  {
    q: '¿Cuánto tardáis en fabricar y enviar?',
    a: 'Los plazos dependen de la cantidad y del momento del año, pero lo hablamos contigo al hacer el presupuesto para llegar siempre a tiempo a tu evento. Enviamos a toda España.',
  },
  {
    q: '¿Puedo enviaros mi propia idea o boceto?',
    a: '¡Sí, nos encanta! En el formulario de presupuesto puedes subir imágenes, referencias o bocetos. Cuanta más información nos des, mejor enfocamos el diseño.',
  },
  {
    q: '¿Hacéis pedidos pequeños o solo grandes cantidades?',
    a: 'Hacemos desde piezas sueltas (por ejemplo, un Funko Pop personalizado o un trofeo único) hasta packs completos para ligas y campeonatos. Nos adaptamos a tu evento.',
  },
  {
    q: '¿De qué material son los trofeos?',
    a: 'Imprimimos en 3D con plástico de alta calidad. En la gama alta añadimos una base de cemento que aporta peso y una sensación premium en la mano (+5 €/ud).',
  },
  {
    q: '¿Hay un pedido mínimo? ¿Los envíos se pagan aparte?',
    a: 'Trabajamos pedidos a partir de 200 €. Los envíos a toda España van siempre incluidos en el precio, sin coste adicional.',
  },
] as const;
