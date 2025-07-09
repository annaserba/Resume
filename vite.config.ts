import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import * as markdown from 'vite-plugin-markdown';

// @ts-ignore - Ignoring type issues with the markdown plugin options
const options = {
    mode: ['html'],
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true
    }
  };

export default defineConfig({
  plugins: [
    react(),
    // @ts-ignore - Ignoring type issues with the markdown plugin
    markdown.plugin(options),
  ],
  assetsInclude: ['./src/content/*.md', './src/locales/*.json'],
  root: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
});
