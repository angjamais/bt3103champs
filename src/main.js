import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import myRoutes from './routes.js'
/*import 'bootstrap/dist/css/bootstrap.min.css'*/
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyBBGG-geTLCteVVXheljy1188s5s2WzwbE",
        libraries: "places" // necessary for places input
    }
});

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