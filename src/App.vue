<template>
    <div>
        Hello Ebuild!
        <div>
            <router-link :to='{name:"main"}'>Main</router-link>
            <router-link :to='{name:"color"}'>About</router-link>
            <router-link :to='{name:"home"}'>Home</router-link>
        </div>
        <router-view/>
    </div>
</template>
<script>
</script>

