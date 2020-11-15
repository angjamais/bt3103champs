import Donate from './components/Donate.vue'
import DonateForm from './components/DonateForm.vue'
//import Dummy from './components/HelloWorld.vue'
import Requests from './components/Requests.vue'
import Home from './components/Home.vue'
import JoinUs from './components/JoinUs.vue'
import ContactUs from './components/ContactUs.vue'
import AboutMe from './components/AboutMe.vue'
import SignUp from './components/SignUp.vue'
import SignUpD from './components/SignUp-Donate.vue'
import Login from './components/Login.vue'
import ForgetPassword from './components/ForgetPassword.vue'
import RegisterAccount from './components/RegisterAccount.vue'
import GMap from './components/MapDemo.vue'
import mRequest from './components/make_request/MakeRequest.vue'
import Photo from './views/Photo.vue';
//import BarChart from './components/BarChart.vue'
//import PieChart from './components/PieChart.vue'
//import TreeMap from './components/TreeMap.vue'
//import GradientLine from './components/GradientLine.vue'
import Dashboard from './components/Dashboard.vue'
import rdonation from './components/make_request/submitrequest-donation.vue'
import rrecruitment from './components/make_request/submitrequest-recruitment.vue'
import ronline from './components/make_request/submitrequest-online.vue'
import rrequest from './components/make_request/submitrequest-request.vue'

export default[
    { path: '/', component: Home}, // default page is Home
    { path: '/home', component: Home},
    { path: '/requests', component: Requests, props: true},
    { path: '/join_us', component: JoinUs},
    { path: '/donate', component: Donate },
    { path: '/donate_form', name:"donate", component: DonateForm, props: true },
    { path: '/contact_us', component: ContactUs} ,
    { path: '/inbox', component: SignUp },
    { path: '/signup', component: SignUp, name: 'signup', props: true, meta: { requiresAuth: true } },
    { path: '/signup-donate', component: SignUpD, name: 'signup-donate', props: true, meta: { requiresAuth: true } },
    { path: '/personal', component: AboutMe, meta: { requiresAuth: true } },
    { path: '/login', component: Login},
    { path: '/forget_password', component: ForgetPassword },
    { path: '/register_account', component: RegisterAccount },
    { path: '/mapdemo', component: GMap },
    { path: '/makerequest', component: mRequest, meta: { requiresAuth: true } },
    { path: '/photo/:id', component: Photo},
    { path: '/dashboard', component: Dashboard }, 
    { path: '/submitrequest-donate', component: rdonation },
    { path: '/submitrequest-recruitment', component: rrecruitment },
    { path: '/submitrequest-online',  component: ronline },
    { path: '/submitrequest-request',  component: rrequest },
]
