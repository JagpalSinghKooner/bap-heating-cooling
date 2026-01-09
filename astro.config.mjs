import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://bapheating.ca',
  trailingSlash: 'always',
  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll use our own base styles
    }),
    sitemap(),
  ],
});
