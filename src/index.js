import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {Dialog, Select, Option, Button, Slider,
    Tabs, TabPane, Form, FormItem, Input, Radio, RadioGroup,
    Table, TableColumn} from 'element-ui';
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
import 'element-ui/lib/theme-chalk/radio.css';
import 'element-ui/lib/theme-chalk/table.css';
import './style/element.less';
import './style/index.less';
import './vant';
import {isMobile} from './util/util';

// element
[Dialog, Select, Option, Button, Slider,
    Tabs, TabPane, Form, FormItem, Input, Radio, RadioGroup,
    Table, TableColumn].forEach((c) => Vue.use(c));

Vue.mixin({
    data () {
        return {isMobile: isMobile()};
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
