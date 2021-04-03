<template>
    <div class='slider-item'>
        <van-row class='slider-row'>
            <van-col span='4'>{{title}}:</van-col>
            <van-col span='20'>
                <van-slider
                    v-model='sliderValue'
                    @input='change'
                    bar-height='4px'
                    :active-color='color'
                    :min='0'
                    :max='255'>
                    <template #button>
                        <div
                            class='custom-button'
                            :style="{'background-color': color}">
                            {{ sliderValue }}
                        </div>
                    </template>
                </van-slider>
            </van-col>
        </van-row>
    </div>
</template>
<script>
    export default {
        props: {
            title: String,
            color: String,
            value: Number,
        },
        data () {
            return {
                sliderValue: 0
            };
        },
        methods: {
            change () {
                this.$emit('update:value', this.sliderValue);
            }
        }
    };
</script>
<style>
    .slider-row{
        display: flex;
        align-items: center;
    }
    .slider-item{
        padding: 15px 0;
    }
    .custom-button{
        width: 26px;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        border-radius: 100px;
    }
</style>

