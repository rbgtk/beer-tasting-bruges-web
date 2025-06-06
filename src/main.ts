import { createApp } from 'vue';
import './style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import App from './App.vue';
import router from '@/router';

createApp(App).use(router).mount('#app');
