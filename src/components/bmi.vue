<template>
    <el-form ref='form' class='form' label-width='75px'>
        <el-form-item label='公式:'>
            <div>BMI = 体重(kg) ÷ 身高(m)<sup>2</sup></div>
            <div class='tip'>身体质量指数(Body Mass Index, 简称BMI), 亦称克托莱指数, 是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。</div>
        </el-form-item>
        <el-form-item label='体重(kg):'>
            <el-input v-model.number='weight'></el-input>
        </el-form-item>
        <el-form-item label='身高(cm):'>
            <el-input v-model.number='height'></el-input>
        </el-form-item>
        <el-form-item label=''>
            <el-button @click='count'>计算</el-button>
        </el-form-item>
        <div v-if='value !== 0'>
            <el-form-item label='结果:'>
                <div>BMI = {{resultWeight}}kg ÷ {{resultHeight/100}}m<sup>2</sup> = {{value}}</div>
                <div class='bmi-width' :style='{"background-color": resultColor}'>{{result}}</div>
                <img class='bmi-width' :src='require("../images/bmi.png").default' alt=''>
            </el-form-item>
            <!-- <el-slider
                :min='10'
                :max='50'
                disabled
                v-model='value'
                :marks='marks'>
            </el-slider> -->
        </div>
    </el-form>
</template>
<script>
    import {Message} from 'element-ui';
    export default {
        data () {
            return {
                height: '',
                weight: '',
                value: 0,
                result: '',
                resultColor: '',
                resultHeight: 0,
                resultWeight: 0
                // marks: {
                //     18.4: {style: {color: '#ccc'}, label: this.$createElement('strong', '偏瘦')},
                //     23.9: {style: {color: '#6c0'}, label: this.$createElement('strong', '正常')},
                //     27.9: {style: {color: '#ff0'}, label: this.$createElement('strong', '过重')}
                // }
            };
        },
        methods: {
            count () {
                if (!this.weight || !this.height) {
                    return Message.error('输入有误');
                }
                this.value = parseFloat((this.weight / Math.pow(this.height / 100, 2)).toFixed(2));
                this.resultHeight = this.height;
                this.resultWeight = this.weight / 100;
                if (this.value <= 18.4) {
                    this.result = '偏瘦';
                    this.resultColor = '#ccc';
                } else if (this.value < 24) {
                    this.result = '正常';
                    this.resultColor = '#6c0';
                } else if (this.value < 28) {
                    this.result = '偏重';
                    this.resultColor = '#ff0';
                } else {
                    this.result = '肥胖';
                    this.resultColor = '#f90';
                }
            }
        }
    };
</script>
<style>
.tip{
    font-size: 12px;
    color: #aaa;
    line-height: 15px;
}
.bmi-width{
    width: 100%;
    max-width: 500px;
}
div.bmi-width{
    text-align: center;
    font-weight: bold;
}
    
</style>

