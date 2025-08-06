import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://silentcommit.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
      configFile: './tailwind.config.mjs'
    }),
    react(),
    sitemap()
  ],
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});