import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import store from './store';
import './plugins/echarts';
import VueTimers from 'vue-timers'
import './registerServiceWorker'
import VModal from 'vue-js-modal'
// eslint-disable-next-line no-unused-vars
import {constructChart, sortData, importData, interpolateData} from "@/constants";
import moment from "moment";
import {OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import VueGridLayout from "vue-grid-layout";

Vue.component('overlay-scrollbars', OverlayScrollbarsComponent);
Vue.use(VModal, {dynamic: true, dynamicDefaults: {clickToClose: true}})
Vue.use(VueGridLayout);
Vue.use(VueTimers)

Vue.config.productionTip = false;

Vue.mixin({
    methods: {
        updateData: function () {
            fetch("api/stats").catch(e => {
                console.warn('Response Error: ' + e);
                return null
            })
                .then(response => response.json().catch(e => {
                    console.warn('Response Error: ' + e);
                    return null
                }))
                .then(response => {
                    if (response === null)
                        return
                    store.commit('pushStats', response);
                    store.commit('updateDatasets', response)
                    localStorage.stats = JSON.stringify(store.getters.data.stats);
                }).catch((err) => {
                console.log(err);
            });
        },
    }
})

if (localStorage.refreshRate)
    store.commit('setRefresh', parseInt(localStorage.refreshRate))
if (localStorage.stats && store.getters.data.stats.length < 1) {
    store.commit('setStats', JSON.parse(localStorage.stats))
    let sortNeeded = false;
    store.getters.data.stats.forEach((x, idx) => {
        if (idx > 0){
            if (moment(Object.keys(x)[0]) < moment(Object.keys(store.getters.data.stats[idx - 1])[0])) {
                sortNeeded = true
            }
        }
    })
    if (sortNeeded)
        sortData();
    interpolateData(store.getters.data.updateInterval, store.getters.data.updateInterval/5);
    store.commit('setDatasets', importData(JSON.stringify(store.getters.data.stats)))
}
fetch("api/pastStats")
    .then(response => response.json().catch(e => {
        console.warn('Response Error: ' + e);
        return null
    }))
    .then(response => {
        if (response === null) return;
        Object.keys(response).forEach((k) => {
            store.commit('pushStats', JSON.parse('{"' + k + '": ' + JSON.stringify(response[k]) + '}'))
        });
    }).catch((err) => console.log(err));


if (localStorage.hasBackground)
    store.commit('setHasBg', localStorage.hasBackground === 'true')
if (localStorage.showAppBar)
    store.commit('showAppBar', localStorage.showAppBar === 'true')
if (localStorage.theme && localStorage.theme !== 'undefined')
    store.commit('setTheme', localStorage.theme);
else
    store.commit('setTheme', 'light');
if (localStorage.backgroundURL)
    store.commit('setBgUrl', localStorage.backgroundURL)
if (localStorage.dashboardLayout) {
    try {
        store.commit('setLayout', JSON.parse(localStorage.dashboardLayout));
        store.commit('setChart', JSON.parse(localStorage.dashboardCharts).map((x) => constructChart(x)))
    } catch (e) {
        store.commit('resetLayout');
        console.warn('There was an error reading the saved layout:')
        console.warn(e)
        console.warn('Using default layout')
    }
} else
    store.commit('resetLayout');
if (localStorage.consoleLines)
    store.commit('setConsoleData', JSON.parse(localStorage.consoleLines))

new Vue({
    render: h => h(App),
    router,
    store,
    vuetify,
}).$mount('#app')
