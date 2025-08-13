import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import process from 'node:process';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    })
  ],
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    define: {
      'import.meta.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY || ''),
      'import.meta.env.ENABLE_CHAT_WIDGET': JSON.stringify(process.env.ENABLE_CHAT_WIDGET || 'false')
    }
  }
});
