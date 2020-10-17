import Donate from './components/Donate.vue'
import Dummy from './components/HelloWorld.vue'

export default[
    { path: '/', component: Dummy},
    { path: '/join_us', component: Dummy},
    { path: '/requests', component: Dummy},
    { path: '/donate', component: Donate },
    { path: '/contact_us', component: Dummy },
    { path: '/inbox', component: Dummy },
    { path: '/personal', component: Dummy }
]