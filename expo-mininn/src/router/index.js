import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import RequestStatus from '../views/RequestStatus.vue'
import DeclarantStatus from "../views/DeclarantStatus";
import InnoWeek from "../views/InnoWeek";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        exit: true,
        component: InnoWeek,

    },
//    {
//        path: "/request_status",
//        name: "request_status",
//        component: RequestStatus,
//    },
//    {
//        path: "/innoweek20/new",
//        name: "innoweek",
//        component: InnoWeek,
//    },
    {
        path: "/declarant_status",
        name: "declarant_status",
        component: DeclarantStatus,
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
