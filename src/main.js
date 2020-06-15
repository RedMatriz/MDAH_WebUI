import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import store from './store';

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
    vuetify
}).$mount('#app')
