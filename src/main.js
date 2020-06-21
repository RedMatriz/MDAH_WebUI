import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import store from './store';
import grid from './plugins/vue-grid-layout';
import echarts from './plugins/echarts';
import './registerServiceWorker'

Vue.config.productionTip = false

window.Event = new Vue();

new Vue({
    render: h => h(App),
    router,
    store,
    vuetify,
    grid,
    echarts
}).$mount('#app')
