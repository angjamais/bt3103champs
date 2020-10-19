import Dummy from './components/HelloWorld.vue'
import Requests from './components/Requests.vue'

export default[
    { path: '/', component: Dummy},
    { path: '/join_us', component: Dummy},
    { path: '/requests', component: Requests},
    { path: '/donate', component: Dummy },
    { path: '/contact_us', component: Dummy },
    { path: '/inbox', component: Dummy },
    { path: '/personal', component: Dummy }
]