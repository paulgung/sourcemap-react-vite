import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 设置代理规则
      "/api": {
        target: "https://apm.myhexin.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径，去掉 '/api' 前缀
        headers: {
          // 如果需要添加额外的请求头，可以在这里设置
          // 'X-Requested-With': 'XMLHttpRequest'
        },
      },
    },
  },
  plugins: [react()],
  build: {
    sourcemap: true, // 开启 Source Map
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "*": path.resolve(""),
    },
  },
});
