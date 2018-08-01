'use strict';

require.config({
    // baseUrl: "/",
    paths: {
        // 'Vue': "https://cdn.bootcss.com/vue/2.5.13/vue.js",
        'math': "math",
    }
})

require(['Module/RequireJS/math'], function (math) {
    console.log("2+3="+ math.add2(2, 3))
    console.log("2+3=",3)
})