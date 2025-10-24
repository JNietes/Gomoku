import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from "vite-plugin-static-copy";

export function viteStaticCopyPyodide() {
  return viteStaticCopy({
    targets: [
      {
        src: "node_modules/pyodide/*",
        dest: "assets",
      },
    ],
  });
}

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: { exclude: ["pyodide"] },
  plugins: [viteStaticCopyPyodide(), react()],
  base: "/Gomoku"
})
