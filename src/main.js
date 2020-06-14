import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import dashboard from "@/components/Dashboard";
import console from "@/components/Console";
import options from "@/components/Options";
import about from "@/components/About";

Vue.config.productionTip = false
const routes = [
    {path: '/dash', component: dashboard, name: 'dash'},
    {path: '/cons', component: console},
    {path: '/opts', component: options},
    {path: '/info', component: about},
    ]

const router = new VueRouter({
  routes
});

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  vuetify
}).$mount('#app')
