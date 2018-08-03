<template>
    <button @click="handleClick" :style="styles">
        <slot></slot>
    </button>
</template>

<script>
    const style = 'background-color: #174040;color: #ffffff;padding: 5px;border-radius: 5px;'

    export default {
        props: {
            color: {
                type: String,
                default: '#0c6'
            }
        },
        computed: {
            styles() {
                console.log("%c "+"button.vue computed styles this:", style,this);
                return {
                    background: this.color,
                }
            }
        },
        methods: {
            handleClick: function (e) {
                console.log("%c " +   "button.vue handleClick e:",style, e)
                this.$emit('click', e)  // 刚开始忘记了这么写
            }
        }
    }
</script>
<style scoped>
    button {
        border:0;
        outline: none;
        color: #fff;
        padding: 4px 8px;
    }
    button:active {
        position: relative;
        top: 1px;
        left: 1px;
    }

</style>