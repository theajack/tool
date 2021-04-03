import Vue from 'vue';
import Router from 'vue-router';
import CalendarMagic from '../pages/calendar-magic/index.vue';
import Home from '../pages/home.vue';
import Color from '../pages/color/index.vue';
import Fuli from '../pages/fuli.vue';
import Dingtou from '../pages/dingtou/index.vue';
import Bmi from '../pages/bmi.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {title: '首页', icon: 'wap-home-o'}
    },
    {
        path: '/c-magic',
        name: 'cmagic',
        component: CalendarMagic,
        meta: {title: '日历小魔术', icon: 'calendar-o'}
    },
    {
        path: '/dingtou',
        name: 'dingtou',
        component: Dingtou,
        meta: {title: '定投模拟', icon: 'chart-trending-o'}
    },
    {
        path: '/fuli',
        name: 'fuli',
        component: Fuli,
        meta: {title: '复利计算', icon: 'after-sale'}
    },
    {
        path: '/color',
        name: 'color',
        component: Color,
        meta: {title: 'RGB颜色', icon: 'brush-o'}
    },
    {
        path: '/bmi',
        name: 'bmi',
        component: Bmi,
        meta: {title: 'BMI计算', icon: 'discount'}
    }
];

const router = new Router({routes});
export default router;