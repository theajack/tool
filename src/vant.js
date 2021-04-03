import Vue from 'vue';
import {
    NavBar, Icon,
    Form, Field, Button, Col, Row, DatetimePicker,
    Popup, Sidebar, SidebarItem, Grid, GridItem,
    Slider, RadioGroup, Radio
} from 'vant';
import 'vant/lib/index.css';

[
    NavBar, Icon,
    Form, Field, Button, Col, Row, DatetimePicker,
    Popup, Sidebar, SidebarItem, Grid, GridItem,
    Slider, RadioGroup, Radio
].forEach((c) => Vue.use(c));