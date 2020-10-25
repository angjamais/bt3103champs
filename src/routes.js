import Donate from './components/Donate.vue'
import DonateForm from './components/DonateForm.vue'
import Dummy from './components/HelloWorld.vue'
import Requests from './components/Requests.vue'
import Home from './components/Home.vue'
import JoinUs from './components/JoinUs.vue'
import RegHousehold from './components/RegisterHousehold.vue'
import RegVolunteer from './components/RegisterVolunteer.vue'

export default[
    { path: '/', component: Dummy},
    { path: '/join_us', component: Dummy},
    { path: '/requests', component: Requests},
    { path: '/', component: Home},
    { path: '/join_us', component: JoinUs},
    { path: '/requests', component: Dummy},
    { path: '/donate', component: Donate },
    { path: '/donate_form', component: DonateForm },
    { path: '/registerhousehold', component: RegHousehold},
    { path: '/registervolunteer', component: RegVolunteer},
    { path: '/contact_us', component: Dummy },
    { path: '/inbox', component: Dummy },
    { path: '/personal', component: Dummy }
]