<template>
    <el-tabs v-model='activeName' @tab-click='handleClick'>
        <el-tab-pane label='福利计算' name='fuli'><Fuli /></el-tab-pane>
        <el-tab-pane label='定投模拟' name='dingtou'><Dingtou /></el-tab-pane>
        <el-tab-pane label='颜色RBG' name='color'><Color /></el-tab-pane>
    </el-tabs>
</template>
<script>
    import Color from './color.vue';
    import Fuli from './fuli.vue';
    import Dingtou from './dingtou.vue';
    
    export default {
        components: {Color, Fuli, Dingtou},
        data () {
            return {
                activeName: 'fuli'
            };
        },
        mounted () {
            let hash = location.hash.replace('#', '').replace('/', '');
            if (hash) {
                this.activeName = hash;
            }
        },
        methods: {
            handleClick (tab, event) {
                console.log(tab, event);
                location.hash = this.activeName;
            }
        }
    };
</script>