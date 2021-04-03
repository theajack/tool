<template>
    <div>
        <van-grid :column-num='3'>
            <van-grid-item
                v-for='item in routeData'
                :key='item.name'
                :icon='item.icon'
                @click='route(item.path)'
                :text='item.title' />
        </van-grid>
    </div>
</template>
<script>
    import {LinkData} from '../util/util';
    export default {
        data () {
            return {
                routeData: [],
                linkData: LinkData,
            };
        },
        mounted () {
            this.$router.options.routes.forEach((item) => {
                if (item.name !== 'home') {
                    this.routeData.push({
                        name: item.name,
                        title: item.meta.title,
                        icon: item.meta.icon,
                        path: item.path,
                    });
                }
            });
            this.routeData.push(...LinkData);
        },
        methods: {
            route (path) {
                if (path.indexOf('http') === 0) {
                    window.open(path);
                } else {
                    if (this.$route.path === path) return;
                    this.$router.push({path});
                }
            },
        }
    };
</script>

