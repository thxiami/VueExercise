<template>
    <div>
        <!--<h1><a href="#" + title>{{ title }}</a></h1> // 这种写法是不对的-->
        <h1><a :href="'#'+title">{{ title }}</a></h1>
        <!--// 这种写法是对的-->
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
            }
        }
    }
</script>
<style scoped>
    h1 a{
        color: #39f;
        font-size: 24px;
    }
</style>