// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),           // React plugin
    tsconfigPaths(),   // Automatically resolves paths from tsconfig.json
  ],
});