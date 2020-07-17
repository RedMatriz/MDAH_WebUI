import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import store from './store';
import './plugins/echarts';
import VueTimers from 'vue-timers'
import './registerServiceWorker'
import VModal from 'vue-js-modal'
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
    store.commit('setOption', ['hasBgImage', localStorage.hasBackground === 'true'])
if (localStorage.showAppBar)
    store.commit('setOption', ['showAppBar', localStorage.showAppBar === 'true'])
if (localStorage.theme && localStorage.theme !== 'undefined')
    store.commit('setTheme', localStorage.theme);
else
    store.commit('setTheme', 'light');
if (localStorage.exp_customTheme)
    store.commit('setCustom', JSON.parse(localStorage.exp_customTheme))
if (localStorage.backgroundAlpha)
    store.commit('setAlpha', parseInt(localStorage.backgroundAlpha))
if (localStorage.backgroundURL)
    store.commit('setOption', ['bgImage', localStorage.backgroundURL])
if (localStorage.consoleLines)
    store.commit('setConsoleData', JSON.parse(localStorage.consoleLines))
if (localStorage.lockGrid)
    store.commit('setOption', ['lockGrid', localStorage.lockGrid === 'true'])
if (localStorage.exp_connectGraphs)
    store.commit('setOption', ['exp_connectGraphs', localStorage.exp_connectGraphs === 'true'])
if (localStorage.exp_showAbout)
    store.commit('setOption', ['exp_showAbout', localStorage.exp_showAbout === 'true'])
if (localStorage.exp_showConsole)
    store.commit('setOption', ['exp_showConsole', localStorage.exp_showConsole === 'true'])
if (localStorage.exp_consoleGrid)
    store.commit('setOption', ['exp_consoleGrid', localStorage.exp_consoleGrid === 'true'])
if (localStorage.exp_showClientSettings)
    store.commit('setOption', ['exp_showClientSettings', localStorage.exp_showClientSettings === 'true'])
if (localStorage.superSecret)
    store.commit('setOption', ['superSecret', localStorage.superSecret === 'true'])
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
new Vue({
    render: h => h(App),
    router,
    store,
    vuetify,
}).$mount('#app')
