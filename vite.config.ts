import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@css': path.resolve(__dirname, 'src/index.css')
        }
    }
})
