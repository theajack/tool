<template>
    <div class='padding-10'>
        <div>
            <div style='margin-bottom: 10px'>颜色: rgb({{r}}, {{g}}, {{b}})</div>
            <div class='block' :style='{"background-color": "rgb("+r+","+g+", "+b+")"}'>
            </div>
        </div>
        <div v-if='isMobile'>
            <mobile-slider :value.sync='r' color='#f00' title='红色'/>
            <mobile-slider :value.sync='g' color='#0f0' title='绿色'/>
            <mobile-slider :value.sync='b' color='#00f' title='蓝色'/>
        </div>
        <el-form v-else ref='form' class='form' label-width='70px'>
            <el-form-item class='red' :label="'红色:'+r">
                <el-slider v-model='r' :max='255'></el-slider>
            </el-form-item>
            <el-form-item class='green' :label="'绿色:'+g">
                <el-slider v-model='g' :max='255'></el-slider>
            </el-form-item>
            <el-form-item class='blue' :label="'蓝色:'+b">
                <el-slider v-model='b' :max='255'></el-slider>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import MobileSlider from './mobile-slider.vue';
    export default {
        components: {MobileSlider},
        data () {
            return {r: 0, g: 0, b: 0};
        }
    };
</script>
<style>

    .custom-button {
        width: 26px;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #ee0a24;
        border-radius: 100px;
    }
    .form{
    width:300px;
    }
    .block{
        height: 100px;
        border: 1px solid #000;
    }
    .red .el-slider__bar{
        background-color: #f00;
    }
    .red .el-slider__button{
    border: 2px solid #f00;
    }
    .green .el-slider__bar{
        background-color: #0f0;
    }
    .green .el-slider__button{
    border: 2px solid #0f0;
    }
    .blue .el-slider__bar{
        background-color: #00f;
    }
    .blue .el-slider__button{
    border: 2px solid #00f;
    }
</style>

