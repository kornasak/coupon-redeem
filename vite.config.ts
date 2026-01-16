import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT) || 5173,
      proxy: {
        "/netmarble": {
          target: "https://coupon.netmarble.com",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/netmarble/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@api": path.resolve(__dirname, "src/api"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  };
});
