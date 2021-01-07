<template>
    <div>
        <!-- Hello Ebuild!
        <div>
            <router-link :to='{name:"main"}'>Main</router-link>
            <router-link :to='{name:"color"}'>About</router-link>
            <router-link :to='{name:"home"}'>Home</router-link>
        </div>
        <router-view/> -->
        <Main />
    </div>
</template>
<script>
    import Main from './components/main.vue';
    export default {
        components: {Main},
        data () {
            return {
                activeName: 'color'
            };
        },
        methods: {
            handleClick (tab, event) {
                console.log(tab, event);
                location.hash = this.activeName;
            }
        }
    };
</script>

