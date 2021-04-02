<template>
    <el-tabs v-model='activeName' @tab-click='handleClick'>
        <el-tab-pane label='复利计算' name='fuli'><Fuli /></el-tab-pane>
        <el-tab-pane label='定投模拟' name='dingtou'><Dingtou ref='dingtou'/></el-tab-pane>
        <el-tab-pane label='颜色RBG' name='color'><Color /></el-tab-pane>
        <el-tab-pane label='BMI计算' name='bmi'><Bmi /></el-tab-pane>
        <el-tab-pane label='日历Magic' name='magic'><Magic /></el-tab-pane>
    </el-tabs>
</template>
<script>
    import Color from './color.vue';
    import Fuli from './fuli.vue';
    import Dingtou from './dingtou.vue';
    import Bmi from './bmi.vue';
    import Magic from './magic.vue';
    
    export default {
        components: {Color, Fuli, Dingtou, Bmi, Magic},
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
            handleClick () {
                location.hash = this.activeName;
                if (this.activeName === 'dingtou') {
                    this.$refs.dingtou.resizeChart();
                }
            }
        }
    };
</script>