import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initPlugins from './plugins';

const app = createApp(App).use(router).use(store);

initPlugins(app);

app.mount('#app');
