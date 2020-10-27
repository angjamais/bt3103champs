import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import myRoutes from './routes.js'
/*import 'bootstrap/dist/css/bootstrap.min.css'*/

Vue.use(VueRouter)
Vue.config.productionTip = false

const myRouter = new VueRouter({
    routes: myRoutes,
    mode: 'history'
})

new Vue({
    render: h => h(App),
    router: myRouter
}).$mount('#app')