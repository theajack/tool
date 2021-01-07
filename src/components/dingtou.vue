<template>
    <div>
        <el-form ref='form' class='form' label-width='120px'>
            <el-form-item :label='typeName[type] +"(元):"'>
                <el-input placeholder='单位：元' v-model='buys'></el-input>
            </el-form-item>
            <el-form-item label='涨跌(%):'>
                <el-input placeholder='单位：%' v-model='rates'></el-input>
                <div>不同天之间已空格分隔</div>
            </el-form-item>
            <el-form-item label='定投策略:'>
                <el-radio-group v-model='type'>
                    <el-radio :value='0'>不定投</el-radio>
                    <el-radio :value='1'>平均定投</el-radio>
                    <el-radio :value='2'>自定义定投</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label=''>
                <el-button @click='count'>计算</el-button>
            </el-form-item>
        </el-form>
        <div ref='chart' class='chart'></div>
    </div>
</template>
<script>
    import {init} from 'echarts';
    import {Message} from 'element-ui';
    let chart;
    export default {
        data () {
            return {
                buys: '',
                rates: '',
                type: 0,
                typeName: ['一次性买入', '定额定投', '自定义定投']
            };
        },
        mounted () {
            chart = init(this.$refs.chart);
            this.reinitLine();
        },
        methods: {
            count () {
                if (!this.buys || !this.rates) {
                    return Message.error('输入不可为空');
                }
                
                let buyNums = this.buys.split(' ').map(item => parseInt(item));
                let rateNums = this.rates.split(' ').map(item => parseInt(item));
            },
            reinitLine () {
                let option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        label: {
                            show: true,
                            formatter: '{b}: {c}',
                            textStyle: {
                                color: '#000'
                            }
                        }
                    }]
                };
                chart.setOption(option);

            },
            dingtou (every, rates) {
                let money = 0;
                
                if (every.length === 1) {
                    money = every[0];
                    rates.forEach((rate, index) => {
                        let result = money * rate * 0.01;
                        if (index === 0) {
                            console.log(`不采用定投， 全部买入${money}元`);
                        }
                        console.log(`第${index + 1}天: 本金${money}元；收益率${rate}%; ${rate >= 0 ? '盈利' : '亏损'}${result}元；剩余本金${money + result}元`);
                        money += result;
                    });
                } else {
                    if (every === true) {
                        let per = total / rates.length;
                        every = rates.map(() => per);
                        console.log('平均定投策略');
                    } else {
                        console.log('自定义定投策略');
                    }
                    rates.forEach((rate, index) => {
                        money += every[index];
                        let result = money * rate * 0.01;
                        console.log(`第${index + 1}天: 买入${every[index]}元；本金${money}元；收益率${rate}%; ${rate >= 0 ? '盈利' : '亏损'}${result}元；剩余本金${money + result}元`);
                        money += result;
                    });
                }
            }
        }
    };
</script>

<style>
.chart{
    width:320px;
    height: 300px;
    margin: 0 auto;
}
</style>