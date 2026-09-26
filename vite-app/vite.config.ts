import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const REPO_NAME = "National-Digital-Heritage-Archive"

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === "build"
  const base = isBuild ? `/${REPO_NAME}/` : "/"

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "github-pages-asset-rewriter",
        renderChunk(code) {
          if (isBuild) {
            return code
              .replace(/\/images\//g, `/${REPO_NAME}/images/`)
              .replace(/\/videos\//g, `/${REPO_NAME}/videos/`)
          }
          return null
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
