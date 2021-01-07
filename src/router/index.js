import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../components/home.vue';
// import About from '../components/about.vue';
import Main from '../components/main.vue';

Vue.use(Router);

const routes = [
    {path: '/', name: 'main', component: Main},
];

const router = new Router({routes});

export default router;