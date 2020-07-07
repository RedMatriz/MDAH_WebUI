import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import store from './store';
import './plugins/echarts';
import VueTimers from 'vue-timers'
import './registerServiceWorker'
import VModal from 'vue-js-modal'
import {constructChart, loadData, sortData} from "@/constants";
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
            fetch("api/stats")
                .then(response => response.json().catch(e => {
                    console.warn('Response Error: ' + e);
                    return null
                }))
                .then(response => {
                    if (response === null)
                        return
                    store.commit('pushStats', response);
                    localStorage.stats = JSON.stringify(store.getters.data.stats);
                    let key = Object.keys(response)[0]
                    let inst = response[key];
                    let time = new Date(moment(key));
                    store.commit('pushDate', key)
                    store.commit('pushHitsChange', [time, inst.cache_hits - store.getters.lastValueOf('hits')]);
                    store.commit('pushHits', [time, inst.cache_hits]);
                    store.commit('pushMissesChange', [time, inst.cache_misses - store.getters.lastValueOf('misses')]);
                    store.commit('pushMisses', [time, inst.cache_misses]);
                    store.commit('pushCachedChange', [time, inst.browser_cached - store.getters.lastValueOf('cached')]);
                    store.commit('pushCached', [time, inst.browser_cached]);
                    store.commit('pushBytesSentChange', [time, inst.bytes_sent - store.getters.lastValueOf('bytesSent')]);
                    store.commit('pushBytesSent', [time, inst.bytes_sent]);
                    store.commit('pushReqServChange', [time, inst.requests_served - store.getters.lastValueOf('reqServ')]);
                    store.commit('pushReqServ', [time, inst.requests_served]);
                    store.commit('pushSizeDiskChange', [time, inst.bytes_on_disk - store.getters.lastValueOf('sizeDisk')]);
                    store.commit('pushSizeDisk', [time, inst.bytes_on_disk]);
                }).catch((err) => {
                console.log(err);
            });
        },
    }
})

if (localStorage.stats && store.getters.data.stats.length < 1)
    store.commit('setStats', JSON.parse(localStorage.stats))
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
sortData();
loadData();

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
if (localStorage.refreshRate)
    store.commit('setRefresh', parseInt(localStorage.refreshRate))
if(localStorage.consoleLines)
    store.commit('setConsoleData', JSON.parse(localStorage.consoleLines))

new Vue({
    render: h => h(App),
    router,
    store,
    vuetify,
}).$mount('#app')
