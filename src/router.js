// import {createRouter,createWebHistory} from 'vue-router';
// import Navabar from 
// const router = createRouter({
//    history: createWebHistory(),
//    routes:[] 
// });
// export default router;




import { createRouter, createWebHistory } from 'vue-router';
import NavBar from './components/NavBar.vue';
import RegisterPage from'./components/RegisterPage.vue';
import FooterPage from './components/FooterPage.vue';
import AdminloginPage from './components/AdminloginPage.vue';
import HomePage from './components/HomePage.vue';
import AdminmainPage from './components/AdminmainPage.vue';
import SideBar from './components/SideBar.vue';
import LateRequest from './components/LateRequest.vue';
import LeaveRequest from './components/LeaveRequest.vue';
import StudentDetails from './components/StudentDetails.vue';
import AdminLayout from './components/AdminLayout.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import TodaysAttendance from './components/TodaysAttendance.vue';
import AboutPage from './components/AboutPage.vue';
import FilterAttendance from './components/FilterAttendance.vue';
import BatchPage from './components/BatchPage.vue';
import WorkfromHome from './components/WorkfromHome.vue';
import MapPage from './components/MapPage.vue';
const routes = [

  { path: '/', component: HomePage }, 
  {
    path: '/map',
    name: 'MapPage',
    component: () => import('@/components/MapPage.vue') // Adjust the path if needed
  },
   

  { path: '/nav', component: NavBar},
  { path: '/register',component:RegisterPage},
  { path: '/footer',component:FooterPage},
  { path: '/admin',component:AdminloginPage},
  { path: '/adminmain',component:AdminmainPage},
  { path: '/sidebar',component:SideBar},
  { path: '/lay',component:AdminLayout},
  { path: '/map',component:MapPage},
  
  { path: '/late',component:LateRequest},
  { path: '/leave',component:LeaveRequest},
  { path: '/student',component:StudentDetails},
  { path: '/forgot',component:ForgotPassword},  
  { path: '/todaysatn',component:TodaysAttendance}  ,
  { path: '/about',component:AboutPage},
  { path: '/filter',component:FilterAttendance},
  { path: '/batch',component:BatchPage},
  { path: '/wrk',component:WorkfromHome}
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;



