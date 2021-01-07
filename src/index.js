import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {Dialog, Select, Option, Button, Slider,
    Tabs, TabPane, Form, FormItem, Input} from 'element-ui';
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/select-dropdown.css';
import 'element-ui/lib/theme-chalk/slider.css';
import 'element-ui/lib/theme-chalk/tabs.css';
import 'element-ui/lib/theme-chalk/form.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/message.css';
import './style/element.less';
import './style/index.less';

[Dialog, Select, Option, Button, Slider,
    Tabs, TabPane, Form, FormItem, Input].forEach((c) => Vue.use(c));

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
