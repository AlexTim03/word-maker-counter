import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: fileURLToPath(new URL('./src/components', import.meta.url)),
            contexts: fileURLToPath(new URL('./src/contexts', import.meta.url)),
            pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
            routing: fileURLToPath(new URL('./src/routing', import.meta.url)),
            config: fileURLToPath(new URL('./src/config.ts', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    },
});
