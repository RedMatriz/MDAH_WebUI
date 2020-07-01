import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import store from './store';
import grid from './plugins/vue-grid-layout';
import echarts from './plugins/echarts';
import VueTimers from 'vue-timers'
import './registerServiceWorker'
import VModal from 'vue-js-modal'
// import moment from "moment";

Vue.use(VModal, {dynamic: true, dynamicDefaults: {clickToClose: true}})

Vue.use(VueTimers)

Vue.config.productionTip = false;

// const Event = new Vue()

Vue.mixin({
    methods: {
        loadData: function () {
            for (let i = 0; i < store.getters.data.stats.length; i++) {
                let key = Object.keys(store.getters.data.stats[i])[0]
                let inst = store.getters.data.stats[i][key];
                let hist = i > 0 ? store.getters.data.stats[i - 1][Object.keys(store.getters.data.stats[i - 1])[0]] : null;
                let time = new Date(key);
                // console.log(moment.format('MMM D, h:mm:ss a'))
                store.commit('pushHits', [time, inst.cache_hits]);
                store.commit('pushHitsChange', [time, hist ? inst.cache_hits - hist.cache_hits : 0]);
                store.commit('pushMisses', [time, inst.cache_misses]);
                store.commit('pushMissesChange', [time, hist ? inst.cache_misses - hist.cache_misses : 0]);
                store.commit('pushCached', [time, inst.browser_cached]);
                store.commit('pushCachedChange', [time, hist ? inst.browser_cached - hist.browser_cached : 0]);
                store.commit('pushDate', time)
                store.commit('pushBytesSent', [time, inst.bytes_sent]);
                store.commit('pushBytesSentChange', [time, hist ? inst.bytes_sent - hist.bytes_sent : 0]);
                store.commit('pushReqServ', [time, inst.requests_served]);
                store.commit('pushReqServChange', [time, hist ? inst.requests_served - hist.requests_served : 0]);
                store.commit('pushSizeDisk', [time, inst.bytes_on_disk]);
                store.commit('pushSizeDiskChange', [time, hist ? inst.bytes_on_disk - hist.bytes_on_disk : 0]);
            }
            this.$nextTick(() => store.commit('setLoaded', true))
        },
        sortData: function () {
            let stats = store.getters.data.stats;
            store.commit('setStats', quickSort(stats));

            function quickSort(origArray) {
                if (origArray.length <= 1) {
                    return origArray;
                } else {
                    let left = [];
                    let right = [];
                    let pivot = origArray.pop();
                    let length = origArray.length;
                    for (let i = 0; i < length; i++) {
                        if (new Date(Object.keys(origArray[i])[0]) <= new Date(Object.keys(pivot)[0])) {
                            left.push(origArray[i]);
                        } else {
                            right.push(origArray[i]);
                        }
                    }
                    return [].concat(quickSort(left), pivot, quickSort(right));
                }
            }

            // if (stats.length >= 1)
            //     for (let i = 1; i < stats.length; i++) {
            //         if (Object.keys(stats[i])[0] === Object.keys(stats[i - 1])[0]) {
            //             store.commit('spliceStats', [i, 1]);
            //             i--
            //         }
            //     }
        },
        updateData: function () {
            fetch("api/stats")
                .then(response => response.json())
                .then(response => {
                    store.commit('pushStats', response);
                    localStorage.stats = JSON.stringify(store.getters.data.stats);
                    let key = Object.keys(response)[0]
                    let inst = response[key];
                    let hist = store.getters.data.stats.length > 1 ?
                        store.getters.data.stats[store.getters.data.stats.length - 1][Object.keys(store.getters.data.stats[store.getters.data.stats.length - 1])[0]]
                        : null;
                    let time = new Date(key);
                    // console.log(moment.format('MMM D, h:mm:ss a'))
                    store.commit('pushDate', time)
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
        },
        byteFormat(value, units) {
            units = ['yb', 'zb', 'eb', 'pb', 'tb', 'gb', 'mb', 'kb', 'b']
            let num = parseFloat(value);
            for (let i = 0; i < units.length; i++) {
                let div = Math.pow(10, (units.length - i - 1) * 3);
                if (num >= div)
                    return (num / div).toFixed(2).replace(/\.?0*$/, '') + units[i]
            }
            return num
        },
        unitFormat(value) {
            let num = parseFloat(value);
            if (num >= 1000000000000000)
                return (num / 1000000000000000).toFixed(2).replace(/\.?0*$/, '') + 'q'
            if (num >= 1000000000000)
                return (num / 1000000000000).toFixed(2).replace(/\.?0*$/, '') + 't'
            if (num >= 1000000000)
                return (num / 1000000000).toFixed(2).replace(/\.?0*$/, '') + 'b'
            if (num >= 1000000)
                return (num / 1000000).toFixed(2).replace(/\.?0*$/, '') + 'm'
            if (num >= 1000)
                return (num / 1000).toFixed(2).replace(/\.?0*$/, '') + 'k'
            return num;
        },
    }
})
// eslint-disable-next-line no-unused-vars
let config = {
    methods: {}
}
// eslint-disable-next-line no-unused-vars
let graphBuilder = {
    methods: {}
}

if (localStorage.hasbg)
    store.commit('setHasBg', localStorage.hasbg === 'true')
if (localStorage.showBar)
    store.commit('showAppBar', localStorage.showBar === 'true')
if (localStorage.theme)
    store.commit('setTheme', localStorage.theme);
if (localStorage.bgURL)
    store.commit('setBgUrl', localStorage.bgURL)
if (localStorage.layout)
    try {
        store.commit('setLayout', JSON.parse(localStorage.layout));
    } catch (e) {
        store.commit('resetLayout');
        console.warn('There was an error reading the saved layout:')
        console.warn(e)
        console.warn('Using default layout')
    }
if (localStorage.refresh)
    store.commit('setRefresh', parseInt(localStorage.refresh))
document.body.style.backgroundColor = store.getters.current.backgroundColor;
if (localStorage.stats && store.getters.data.stats.length < 1)
    store.commit('setStats', JSON.parse(localStorage.stats))

new Vue({
    render: h => h(App),
    router,
    store,
    vuetify,
    grid,
    echarts,
}).$mount('#app')
