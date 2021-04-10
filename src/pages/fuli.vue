<template>
    <div class='padding-10'>
        <div v-if='isMobile'>
            <div style='text-align: center'>总金 = 本金 × (1+收益率)<sup>时间</sup></div>

            <div style='margin: 10px 0;'>
                <van-field label-width='100' v-model.number='start' label='本金(万元):' placeholder='单位：万元' />
            </div>
            <div style='margin: 10px 0;'>
                <van-field label-width='100' v-model.number='rate' label='收益率(%):' placeholder='0-100' />
            </div>
            <div style='margin: 10px 0;'>
                <van-field label-width='100' v-model.number='time' label='时间(年):' placeholder='单位：年' />
            </div>
            <div style='margin: 10px;'>
                <van-button round block type='info' @click='count' size='normal'>计算</van-button>
            </div>
            <div>结果</div>
            <div v-if='result !== 0'>
                <div>
                    {{result.start}}万 × (1+{{result.rate}}%)<sup>{{result.time}}年</sup> ≈ {{result.result}}万
                </div>
            </div>
        </div>
        <el-form v-else ref='form' class='form' label-width='100px'>
            <el-form-item label='公式:'>
                <div>总金 = 本金 × (1+收益率)<sup>时间</sup></div>
            </el-form-item>
            <el-form-item label='本金(万元):'>
                <el-input placeholder='单位：万元' v-model.number='start'></el-input>
            </el-form-item>
            <el-form-item label='收益率(%):'>
                <el-input placeholder='0-100' v-model.number='rate'></el-input>
            </el-form-item>
            <el-form-item label='时间(年):'>
                <el-input placeholder='单位：年' v-model.number='time'></el-input>
            </el-form-item>
            <el-form-item label=''>
                <el-button @click='count'>计算</el-button>
            </el-form-item>
            <el-form-item label='结果:' v-if='result !== 0'>
                <div>
                    {{result.start}}万 × (1+{{result.rate}}%)<sup>{{result.time}}年</sup> ≈ {{result.result}}万
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {Message} from 'element-ui';
    export default {
        data () {
            return {
                start: 20,
                rate: 10,
                time: 30,

                result: {
                    start: 20,
                    rate: 10,
                    time: 30,
                    result: 0
                },
            };
        },
        created () {
            this.count();
        },
        methods: {
            count () {
                if (this.start !== '' && this.rate !== '' && this.time !== '') {
                    this.result.start = this.start;
                    this.result.rate = this.rate;
                    this.result.time = this.time;
                    this.result.result = (this.start * Math.pow(1 + this.rate / 100, this.time)).toFixed(2);
                } else {
                    Message.error('输入有误');
                }
            }
        }
    };
</script>
<style>
.form {
    width: 330px;
    margin: 0 auto;
}
</style>