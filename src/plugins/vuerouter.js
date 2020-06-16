import Vue from 'vue'
import dashboard from "@/components/Dashboard";
import console from "@/components/Console";
import options from "@/components/Options";
import about from "@/components/About";
import VueRouter from "vue-router";

const routes = [
    {path: '/', component: dashboard},
    {path: '/cons', component: console},
    {path: '/opts', component: options},
    {path: '/info', component: about},
]

Vue.use(VueRouter)

export default new VueRouter({
    routes
})