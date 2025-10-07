import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import path from "node:path"
import fs from "node:fs"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 手动加载 monorepo 根目录下的 .env
  const root = path.resolve(__dirname, "../../")
  const env = loadEnv(mode, root, "")

  return {
    plugins: [
      // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      tailwindcss(),
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // @ 指向 src
      },
    },
    define: {
      "process.env": env,
    },
    server: {
      https: {
        key: fs.readFileSync("../../cert/key.pem"),
        cert: fs.readFileSync("../../cert/cert.pem"),
      },
      open: true,
    },
  }
})
