<template>
    <div class='tool-main'>
        <Navi />
        <router-view/>
    </div>
</template>
<script>
    // import Main from './components/main.vue';
    import Navi from './components/navi.vue';
    export default {
        components: {Navi},
        data () {
            return {
                activeName: 'color'
            };
        },
        mounted () {
            window._app = this;
        },
        methods: {
            handleClick (tab, event) {
                console.log(tab, event);
                location.hash = this.activeName;
            }
        }
    };
</script>
<style scoped>
    .tool-main{
        max-width: 600px;
        margin: 0 auto;
        padding: 10px;
        padding-top: 56px;
    }
</style>

