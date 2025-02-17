import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'], // Ensure correct input format
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Required for Render
        port: 5173, // Default Vite port
        strictPort: true,
        https: mode === 'production', // Enable HTTPS in production
    },
    build: {
        // manifest: true, // Ensures `manifest.json` is generated
        outDir: 'public/build', // Correct output path for Laravel
        emptyOutDir: true, // Clears old files before building
    },
}));
