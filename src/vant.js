import Vue from 'vue';
import {
    Form, Field, Button, Col, Row, DatetimePicker
} from 'vant';
import 'vant/lib/index.css';

[
    Form, Field, Button, Col, Row, DatetimePicker
].forEach((c) => Vue.use(c));