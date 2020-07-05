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
                    let hist = store.getters.data.stats.length > 1 ?
                        store.getters.data.stats[store.getters.data.stats.length - 1][Object.keys(store.getters.data.stats[store.getters.data.stats.length - 1])[0]]
                        : null;
                    let time = new Date(moment(key));
                    store.commit('pushDate', key)
                    store.commit('pushHits', [time, inst.cache_hits]);
                    store.commit('pushHitsChange', [time, hist ? inst.cache_hits - hist.cache_hits : 0]);
                    store.commit('pushMisses', [time, inst.cache_misses]);
                    store.commit('pushMissesChange', [time, hist ? inst.cache_misses - hist.cache_misses : 0]);
                    store.commit('pushCached', [time, inst.browser_cached]);
                    store.commit('pushCachedChange', [time, hist ? inst.browser_cached - hist.browser_cached : 0]);
                    store.commit('pushBytesSent', [time, inst.bytes_sent]);
                    store.commit('pushBytesSentChange', [time, hist ? inst.bytes_sent - hist.bytes_sent : 0]);
                    store.commit('pushReqServ', [time, inst.requests_served]);
                    store.commit('pushReqServChange', [time, hist ? inst.requests_served - hist.requests_served : 0]);
                    store.commit('pushSizeDisk', [time, inst.bytes_on_disk]);
                    store.commit('pushSizeDiskChange', [time, hist ? inst.bytes_on_disk - hist.bytes_on_disk : 0]);
                }).catch((err) => {
                console.log(err);
            });
            // let temp = moment.now()
            // store.commit('pushDate',temp)
            // store.commit('pushHits', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushHitsChange', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushMisses', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushMissesChange', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushCached', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushCachedChange', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushBytesSent', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushBytesSentChange', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushReqServ', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushReqServChange', [temp,Math.floor(Math.random()*100)]);
            // store.commit('pushSizeDisk', [temp, Math.floor(Math.random()*100)]);
            // store.commit('pushSizeDiskChange', [temp, Math.floor(Math.random()*100)]);
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
        response.forEach((k) => {
            store.commit('pushStats', JSON.parse('{' + k + ': ' + JSON.stringify(response[k]) + '}'))
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


new Vue({
    render: h => h(App),
    router,
    store,
    vuetify,
}).$mount('#app')
