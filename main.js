import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()

//系统错误捕获  
const errorHandler = (err, vm, info) => {  
        // handle error  
        // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子  
        // 只在 2.2.0+ 可用   

        // console.error('抛出全局异常');  
        // console.log("message: " + err.message);  
        // console.log("stack: " + err.stack);  
        // console.error(err);  

        var log = {  
            message: err.message,  
            stack: err.stack  
        }  
        uni.setStorage({  
            key: 'errlog',  
            data: log,  
            success: function() {  
                console.log('success');  
            }  
        });   
        console.log(JSON.stringify(log));
        var time = new Date(); 
        var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' 
                + time.getDate() + ' ' + time.getHours() +
            ':' + time.getMinutes() + ':' + time.getSeconds();
        var lo = "<h4>main.js "+time1 +"</h4>" + JSON.stringify(log) ;
            
        uni.setStorageSync('log', lo + uni.getStorageSync('log') + "<br/>")
}  
Vue.config.errorHandler = errorHandler;  
Vue.prototype.$throw = (error) => errorHandler(error, this);