import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import * as markdown from 'vite-plugin-markdown';
import { Mode } from 'vite-plugin-markdown';

const options = {
    mode: ['html'] as Mode[],
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true
    }
  };

export default defineConfig({
  plugins: [
    react(),
    markdown.plugin(options),
  ],
  assetsInclude: ['./src/content/*.md', './src/locales/*.json', './public/*.*'],
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
