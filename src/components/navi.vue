<template>
    <div>
        <van-nav-bar class='navi-bar' fixed :title='title' left-text='返回' left-arrow @click-left='back'>
            <span slot='right'>
                <van-icon class='navi-icon' v-show='!this.isHome' name='wap-home-o' @click='goHome'/>
                <van-icon class='navi-icon' name='ellipsis' @click='openNavi'/>
            </span>
        </van-nav-bar>
        <van-popup v-model='showNavi' position='right' :style="{width: '50%', height: '100%'}">
            <van-sidebar :style="{width: '100%'}" v-model='activeKey'>
                <van-sidebar-item
                    v-for='item in routeData'
                    :key='item.name'
                    :title='item.title'
                    @click='routeNavi(item.path)'/>
            </van-sidebar>
        </van-popup>
    </div>
</template>
<script>
    import router from '../router';
    import {LinkData} from '../util/util';
    export default {
        data () {
            return {
                activeKey: 0,
                showNavi: false,
                title: '',
                isHome: false,
                routeData: [],
            };
        },
        mounted () {
            this.setRouteInfo(this.$route);
            router.afterEach((to) => {
                this.setRouteInfo(to);
            });
            this.routeData = this.$router.options.routes.map((item, index) => {
                if (this.$route.path === item.path) {
                    this.activeKey = index;
                }
                return {
                    name: item.name,
                    title: item.meta.title,
                    icon: item.meta.icon,
                    path: item.path,
                };
            });
            this.routeData.push(...LinkData);
        },
        methods: {
            routeNavi (path) {
                if (path.indexOf('http') === 0) {
                    window.open(path);
                } else {
                    if (this.$route.path === path) return;
                    this.$router.push({path});
                }
                this.showNavi = false;
            },
            setRouteInfo (route) {
                this.title = route.meta.title;
                this.isHome = route.name === 'home';
            },
            goHome () {
                this.$router.push('/');
            },
            openNavi () {
                this.showNavi = true;
            },
            back () {
                this.$router.back();
            },
        }
    };
</script>
<style>
    .navi-icon{
        margin-right: 10px;
    }
    .navi-icon:last-child{
        margin-right: 0;
    }
    .navi-bar .van-nav-bar__content{
        max-width: 600px;
        margin: 0 auto;
    }
    .van-sidebar-item--select:before{
        background-color: #1989fa!important;
    }
</style>

