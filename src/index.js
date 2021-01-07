import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {Dialog, Select, Option, Button, Slider, Tabs} from 'element-ui';
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/slider.css';
import 'element-ui/lib/theme-chalk/tabs.css';
import 'element-ui/lib/theme-chalk/select-dropdown.css';
import './main/style/element.less';
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Slider);
Vue.use(Tabs);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
