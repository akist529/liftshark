import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from 'vue-query';

const app = createApp(App);

app.use(createPinia()).use(VueQueryPlugin).use(router).mount('#app');
