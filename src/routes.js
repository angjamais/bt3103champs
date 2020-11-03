import Donate from './components/Donate.vue'
import DonateForm from './components/DonateForm.vue'
import Dummy from './components/HelloWorld.vue'
import Requests from './components/Requests.vue'
import Home from './components/Home.vue'
import JoinUs from './components/JoinUs.vue'
import RegHousehold from './components/RegisterHousehold.vue'
import RegVolunteer from './components/RegisterVolunteer.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import ForgetPassword from './components/ForgetPassword.vue'
import RegisterAccount from './components/RegisterAccount.vue'
import GMap from './components/MapDemo.vue'
import mRequest from './components/make_request/MakeRequest.vue'


export default[
    { path: '/', component: Home}, // default page is Home
    { path: '/home', component: Home},
    { path: '/requests', component: Requests},
    { path: '/join_us', component: JoinUs},
    { path: '/donate', component: Donate },
    { path: '/donate_form', component: DonateForm },
    { path: '/registerhousehold', component: RegHousehold},
    { path: '/registervolunteer', component: RegVolunteer},
    { path: '/contact_us', component: Dummy}, // place the sign up page over here first
    { path: '/inbox', component: SignUp },
    { path: '/personal', component: Login },
    { path: '/login', component: Login },
    { path: '/forget_password', component: ForgetPassword },
    { path: '/register_account', component: RegisterAccount },
    { path: '/signup', component: Dummy }, // change to sign up later
    { path: '/mapdemo', component: GMap },
    { path: '/makerequest', component: mRequest },
]