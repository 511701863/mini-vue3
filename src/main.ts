import { createSSRApp } from 'vue';
import store from './store';
import App from './App.vue';
import router from './router';
import nxImage from '@/components/nxImage/nxImage.vue';

import 'uno.css';
import '@/static/css/global.css';
import '@/static/css/resetVant.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(router);
  app.use(store);
  app.component('NxImage', nxImage);
return {
    app
  };
}

