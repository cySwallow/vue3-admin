import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    server: {
      port: 3000
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     target: 'http://localhost:3000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
      //   }
      // }
    }
  };
});
