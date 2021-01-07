<template>
    <el-form ref='form' class='form' label-width='70px'>
        <el-form-item label='颜色:'>
            <div>rgb({{r}}, {{g}}, {{b}})</div>
            <div class='block' :style='{"background-color": "rgb("+r+","+g+", "+b+")"}'>

            </div>
        </el-form-item>
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
</template>
<script>
    export default {
        data () {
            return {r: 0, g: 0, b: 0};
        }
    };
</script>
<style>
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

