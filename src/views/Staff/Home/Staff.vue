<template>
    <div class="home">
        <span>
            <span slot="title"><router-link to="/staff/personalcenter">个人信息</router-link></span>
            <span slot="title"><router-link to="/staff/homepage">首页</router-link></span>
        </span>
        <span>
            <router-view></router-view>
        </span>

    </div>
</template>

<script>

    export default {
        name: "Staff_Home",
        components: {

        },
    };
</script>

<style scoped>

</style>
