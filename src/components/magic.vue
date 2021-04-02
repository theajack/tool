<template>
    <div class='calendar-main'>
        <div v-if='step===1'>
            <van-datetime-picker
                v-model='currentDate'
                type='year-month'
                title='选择年月'
                :min-date='minDate'
                :max-date='maxDate'
            />
            <div style='margin: 10px;'>
                <van-button round block type='info' @click='geneStep2' size='normal'>下一步</van-button>
            </div>
        </div>
        <div v-if='step===2 || step === 3'>
            <van-row class='c-row'>
                <van-col class='c-head' v-for='(head, index) in headerData' :key='index' span='3'>{{head}}</van-col>
            </van-row>
            <van-row class='c-row' v-for='(data, index) in calendarData' :key='index'>
                <van-col
                    class='c-date'
                    :class='{
                        "c-empty": date==-1,
                        "c-disbale2": step2DisableDate.includes(date),
                        "c-disbale3": step3DisableDate.includes(date),
                        "c-choose2": step2ChooseDate.includes(date),
                        "c-choose3": step3ChooseDate.includes(date)
                    }'
                    v-for='(date, index) in data'
                    @click='clickDate(date)'
                    :key='index' span='3'>
                    {{date === -1?'':date}}
                </van-col>
            </van-row>
            <div class='c-result' v-if='step === 3'>
                {{countResult}}
            </div>
            <div style='margin: 15px'>
                <van-row gutter='20'>
                    <van-col span='12' v-if='step === 2'>
                        <van-button round block type='info' @click='geneStep3' size='normal'>下一步</van-button>
                    </van-col>
                    <van-col :span='step === 2 ? "12":"24"'>
                        <van-button round block type='info' plain @click='restart' size='normal'>重新开始</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>
<script>
    import {Notify} from 'vant';
    export default {
        data () {
            return {
                countResult: '',
                step: 1,
                minDate: new Date(1900, 0, 1),
                maxDate: new Date(),
                currentDate: new Date(),
                headerData: ['日', '一', '二', '三', '四', '五', '六'],
                calendarData: [],

                step2Area: [],
                chooseDates: [],

                step2DisableDate: [],
                step3DisableDate: [],

                step2ChooseDate: [],
                step3ChooseDate: []
            };
        },
        methods: {
            getDays (year, month) {
                return new Date(year, month, 0).getDate();
            },
            getDay (year, month) {
                return new Date(year, month - 1, 1).getDay();
            },
            getCalendarData (days, startWeekDay) {
                let data = [];
                let weekday = 0;
                let week = [];
                for (let i = 1 - startWeekDay; i < days; i++) {
                    if (i < 0 || i > days) {
                        week.push(-1);
                    } else {
                        week.push(i + 1);
                    }
                    weekday ++;
                    if (weekday === 7) {
                        weekday = 0;
                        data.push(week);
                        week = [];
                    }
                }
                for (let i = week.length; i < 7; i++) {
                    week.push(-1);
                }
                data.push(week);
                return data;
            },
            geneStep2 () {
                const year = this.currentDate.getFullYear();
                const month = this.currentDate.getMonth() + 1;
                let days = this.getDays(year, month);
                let startWeekDay = this.getDay(year, month);
                this.calendarData = this.getCalendarData(days, startWeekDay);
                this.step = 2;
            },
            geneStep3 () {
                let min = Math.min.apply(null, this.step2ChooseDate);
                let max = Math.max.apply(null, this.step2ChooseDate);
                if (max - min !== 24) {
                    Notify('所选区域不构成4x4矩阵');
                    return;
                }
                let chooseDate2 = [];
                let add = 0;
                for (let i = 0; i < 16; i++) {
                    chooseDate2.push(min + add);
                    if ((i + 1) % 4 === 0) {
                        add += 4;
                    } else {
                        add++;
                    }
                }
                this.step2ChooseDate = chooseDate2;
                this.step2DisableDate = [];
                this.calendarData.forEach(dates => {
                    dates.forEach(date => {
                        if (date !== -1 && !this.step2ChooseDate.includes(date)) {
                            this.step2DisableDate.push(date);
                        }
                    });
                });
                this.step = 3;
            },
            restart () {
                this.step = 1;
                this.calendarData = [];
                this.step2ChooseDate = [];
                this.step3ChooseDate = [];
                this.step2DisableDate = [];
                this.step3DisableDate = [];
            },
            _toggleItem (array, value) {
                if (array.includes(value)) {
                    array.splice(array.indexOf(value), 1);
                    return false;
                } else {
                    array.push(value);
                    return true;
                }
            },
            _addItem (array, value) {
                array.push(value);
            },
            _removeItem (array, value) {
                array.splice(array.indexOf(value), 1);
            },
            clickDate (date) {
                if (date === -1) return;

                if (this.step === 2) {
                    this._toggleItem(this.step2ChooseDate, date);
                } else if (this.step === 3) {
                    if (!this.step2ChooseDate.includes(date)) return;
                    if (this.step3DisableDate.includes(date)) return;

                    // ! 不给取消 否则会容易发现都一样
                    if (this.step3ChooseDate.includes(date)) return;
                    let choose = this._toggleItem(this.step3ChooseDate, date);
                    this._checkStep3Choose(date, choose);
                    let sum = 0;
                    this.step3ChooseDate.forEach(date => {
                        sum += date;
                    });
                    this.countResult = `结果：${this.step3ChooseDate.join(' + ')} = ${sum}`;
                }
            },
            _checkStep3Choose (date, choose) {
                let related = [];
                for (let i = 1; i <= 3; i++) {
                    related.push(
                        date + i,
                        date - i,
                        date + (7 * i),
                        date - (7 * i)
                    );
                }
                related.forEach((value) => {
                    if (!this.step2ChooseDate.includes(value)) return;
                    if (choose) {
                        this._addItem(this.step3DisableDate, value);
                    } else {
                        this._removeItem(this.step3DisableDate, value);
                    }
                });
            }
        }
    };
</script>
<style>
.calendar-main{
    max-width: 500px;
    margin: 0 auto;
}
.c-head,.c-date{
    padding: 10px 0;
}
.c-head{
    background-color: #aaa;
    color: #fff;
    font-weight: bold;
}
.c-date{
    background-color: #fff;
    border: 1px solid #f3f3f3;
    border-top: none;
    border-left: none;
}
.c-date:first-child{
    border-left: 1px solid #f3f3f3;
}
.c-date.c-empty{
    background-color: #eee;
}
.c-date.c-choose2{
    background-color: #1989fa;
    color: #fff;
}
.c-date.c-choose3{
    background-color: #07c160;
    color: #fff;
}
.c-date.c-disbale2{
    background-color: #ddd;
}
.c-date.c-disbale3{
    background-color: #005ab4;
}
.c-row{
    display: flex;
    justify-content: center;
    text-align: center;
}
.c-result{
    margin: 15px;
    text-align: center;
    font-weight: bold;
    color: #005ab4;
}
</style>

