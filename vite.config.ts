import { defineConfig, loadEnv, UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import { fileURLToPath, URL } from "url";
import { createHtmlPlugin } from "vite-plugin-html";
import { wrapperEnv } from "./src/utils/getEnv";

import eslintPlugin from "vite-plugin-eslint";
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return {
    base: "./",
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_APP_TITLE,
          },
        },
      }),
      vuetify({ autoImport: true }),
      eslintPlugin(),
    ],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/common.scss";`,
        },
      },
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
