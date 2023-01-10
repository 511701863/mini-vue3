import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import * as path from 'path';
import pages from './src/pages.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    Unocss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  define: {
    ROUTES: (() => {
      const subPackages = (pages as any)?.subPackages?.map((item) => {
        return item.pages.map((subItem) => {
          return {
            ...subItem,
            path: `${item.root}/${subItem.path}`
          };
        });
      }).flat(2) || [];
      return [...pages.pages, ...subPackages];
    })()
  }
});
