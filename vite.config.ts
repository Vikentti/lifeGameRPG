import * as path from "node:path";

import {reactRouter} from "@react-router/dev/vite";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@server': path.resolve(__dirname, "../server/src"),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/helpers" as *;`
      }
    }
  }
});
