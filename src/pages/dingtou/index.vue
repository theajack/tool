<template>
    <div>
        <div v-if='isMobile'>
            <div style='margin: 10px 0;'>
                <van-field label-width='120' v-model='buys' :label='typeName[type] +"(元):"' placeholder='单位：元' />
                <div class='dingtou-tip' v-if='type===2'>请输入每天的投入金额(元)，以空格分隔</div>
            </div>

            <div style='margin: 10px 0;'>
                <van-field label-width='120' v-model='rates' label='涨跌(%):' placeholder='单位：%' />
                <div class='dingtou-tip'>请输入每天的涨跌幅(%)，以空格分隔</div>
            </div>

            <div style='margin: 10px 0;'>
                <van-radio-group v-model='type' direction='horizontal'>
                    <van-radio :name='0'>不定投</van-radio>
                    <van-radio :name='1'>平均定投</van-radio>
                    <van-radio :name='2'>自定义定投</van-radio>
                </van-radio-group>
            </div>

            <div style='margin: 10px;'>
                <van-button round block type='info' @click='count' size='normal'>计算</van-button>
            </div>
        </div>
        <el-form v-else ref='form' class='form' label-width='120px'>
            <el-form-item :label='typeName[type] +"(元):"'>
                <el-input placeholder='单位：元' v-model='buys'></el-input>
                <div v-if='type===2'>请输入每天的投入金额(元)，以空格分隔</div>
            </el-form-item>
            <el-form-item label='涨跌(%):'>
                <el-input placeholder='单位：%' v-model='rates'></el-input>
                <div>请输入每天的涨跌幅(%)，以空格分隔</div>
            </el-form-item>
            <el-form-item label='定投策略:'>
                <el-radio-group v-model='type'>
                    <el-radio :label='0'>不定投</el-radio>
                    <el-radio :label='1'>平均定投</el-radio>
                    <el-radio :label='2'>自定义定投</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label=''>
                <el-button @click='count'>计算</el-button>
            </el-form-item>
        </el-form>
        <el-table :data='tableData' stripe style='width: 100%'>
            <el-table-column prop='day' label='天数'></el-table-column>
            <el-table-column prop='buy' label='买入'></el-table-column>
            <el-table-column prop='money' label='本金'></el-table-column>
            <el-table-column prop='rate' label='收益率'></el-table-column>
            <el-table-column prop='add' label='盈亏'></el-table-column>
            <el-table-column prop='left' label='剩余本金'></el-table-column>
        </el-table>
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
                buys: '10000',
                rates: '-5 6 -5 6',
                type: 0,
                typeName: ['一次性买入', '总金额', '自定义定投'],
                tableData: [],
            };
        },
        mounted () {
            chart = init(this.$refs.chart);
            this.count();
        },
        methods: {
            resizeChart () {
                setTimeout(chart.resize, 0);
            },
            count () {
                if (!this.buys || !this.rates) {
                    return Message.error('输入不可为空');
                }
                
                let every = this.buys.split(' ').map(item => parseInt(item));
                let rates = this.rates.split(' ').map(item => parseInt(item));
                let ratesData = [0];
                rates.forEach((rate, index) => {
                    ratesData.push((ratesData[index] + rate));
                });

                this.dingtou(every, rates);
                this.reinitLine(ratesData);
            },
            reinitLine (rates) {
                let option = {
                    title: {text: '涨跌幅折线图'},
                    xAxis: {
                        type: 'category',
                        data: rates.map((r, i) => i === 0 ? '起始' : `第${i}天`)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: rates,
                        type: 'line',
                        label: {
                            show: true,
                            formatter: '{b}: {c}%',
                            textStyle: {
                                color: '#000'
                            }
                        }
                    }]
                };
                chart.setOption(option);
                this.resizeChart();
            },
            dingtou (every, rates) {
                let money = 0;
                let data = [];

                let pushData = (index, buy, money, rate, add) => {
                    data.push({
                        day: `第${index + 1}天`,
                        money: money.toFixed(2),
                        buy,
                        rate: `${rate}%`,
                        add,
                        left: (money + add).toFixed(2)
                    });
                };
                
                if (this.type === 0) {
                    money = every[0];
                    rates.forEach((rate, index) => {
                        let result = money * rate * 0.01;
                        if (index === 0) {
                            console.log(`不采用定投， 全部买入${money}元`);
                        }
                        pushData(index, 0, money, rate, result);
                        console.log(`第${index + 1}天: 本金${money}元；收益率${rate}%; ${rate >= 0 ? '盈利' : '亏损'}${result}元；剩余本金${money + result}元`);
                        money += result;
                    });
                } else {
                    if (this.type === 1) {
                        let per = every[0] / rates.length;
                        every = rates.map(() => per);
                        console.log('平均定投策略');
                    } else {
                        console.log('自定义定投策略');
                    }
                    rates.forEach((rate, index) => {
                        money += every[index];
                        let result = money * rate * 0.01;
                        pushData(index, every[index], money, rate, result);
                        console.log(`第${index + 1}天: 买入${every[index]}元；本金${money}元；收益率${rate}%; ${rate >= 0 ? '盈利' : '亏损'}${result}元；剩余本金${money + result}元`);
                        money += result;
                    });
                }
                this.tableData = data;
            }
        }
    };
</script>

<style>
.chart{
    width: 100%;
    height: 350px;
    margin: 0 auto;
}
.form {
    width: 80%;
    min-width: 330px;
}
.dingtou-tip{
    color: #aaa;
    font-size: 13px;
    padding: 0 20px;
}
</style>