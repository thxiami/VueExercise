<template>
    <div>
        Hello {{ name }}
        <v-title title="Vue 组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <p>
            <img src="images/Capture001.png" alt="Capture" style="width: 500px">
        </p>
        <v-test-slot>
            <div slot="t1">t1</div>  // 这里有 slot='t1'，那么不会加载子组件中的<slot name="t1"><</slot>标签中包含的内容
            <!--<div slot="t2">t2</div>--> // 这里没有 slot='t2'，那么直接加载子组件中的<slot name="t2"><</slot>标签中包含的内容
            <!--<div slot="t3"></div>-->
        </v-test-slot>
    </div>
</template>
<script>
    // 导入组件
    import vTitle from './title.vue'
    import vButton from './button.vue'
    import vTestSlot from './testslot.vue'

    export default {
        data() {
            return {
                name: "vue.js",
            }
        },
        components: {
            vTitle,  // ES6 的语法，key value 相同时，等效于 vTitle: vTitle,
            vButton,
            vTestSlot
        },
        methods: {
            handleClick: function (e) {
                console.log("app.vue", e)
            }
        }
    }

</script>
<style scoped>
    div {
        color: #f60;
        font-size: 30px;
    }
</style>