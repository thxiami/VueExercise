//main.js
// import './style.css'
import './style.css'
// 导入 Vue 框架
import Vue from 'vue'
// 导入 app.vue 组件
import App from './app.vue'

// document.getElementById("app").innerHTML = "NEW";

let main = function(){
    // 创建 Vue 根实例
    new Vue({
        el: '#app',
        render: h => h(App),
    });
};

new Vue({
    el: '#app',
    render: h => h(App),
});

// main();
