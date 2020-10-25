import Donate from './components/Donate.vue'
import Dummy from './components/HelloWorld.vue'
import Requests from './components/Requests.vue'
import Home from './components/Home.vue'
import JoinUs from './components/JoinUs.vue'
import RegHousehold from './components/RegisterHousehold.vue'
import RegVolunteer from './components/RegisterVolunteer.vue'
import SignUp from './components/SignUp.vue'

export default[
    { path: '/', component: Home}, // default page is Home
    { path: '/home', component: Home},
    { path: '/requests', component: Requests},
    { path: '/join_us', component: JoinUs},
    { path: '/donate', component: Donate },
    { path: '/registerhousehold', component: RegHousehold},
    { path: '/registervolunteer', component: RegVolunteer},
    { path: '/contact_us', component: Dummy}, // place the sign up page over here first
    { path: '/inbox', component: SignUp },
    { path: '/personal', component: Dummy },
    { path: '/signup', component: Dummy }, // change to sign up later
]