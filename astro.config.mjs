// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// URL final del sitio. Cámbiala cuando tengas el dominio definitivo.
const SITE_URL = 'https://makeable.es';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  // La web es estática salvo la función del formulario (/api/presupuesto),
  // que se ejecuta on-demand gracias al adaptador de Cloudflare.
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [
    sitemap({
      i18n: undefined,
      filter: (page) => !page.includes('/gracias'),
    }),
  ],
  image: {
    // Optimización de imágenes con Sharp (por defecto en Astro).
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
