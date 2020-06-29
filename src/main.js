import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import store from './store';
import grid from './plugins/vue-grid-layout';
import echarts from './plugins/echarts';
import './registerServiceWorker'
import VModal from 'vue-js-modal'
// import moment from "moment";

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } })

Vue.config.productionTip = false;

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
                store.commit('pushMisses', [time, inst.cache_misses]);
                store.commit('pushCached', [time, inst.browser_cached]);
                store.commit('pushDate', time)
                store.commit('pushBytesSent', [time, inst.bytes_sent]);
                store.commit('pushBytesSentChange', [time, hist ? inst.bytes_sent - hist.bytes_sent : 0]);
                store.commit('pushReqServ', [time, inst.requests_served]);
                store.commit('pushReqServChange', [time, hist ? inst.requests_served - hist.requests_served : 0]);
                store.commit('pushSizeDisk', [time, inst.bytes_on_disk]);
                store.commit('pushSizeDiskChange', [time, hist ? inst.bytes_on_disk - hist.bytes_on_disk : 0]);
            }
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
                }).catch((err) => {
                console.log(err);
            });
        },
        byteFormat(value) {
            let num = parseFloat(value);
            if (num >= 1000000000000000)
                return (num / 1000000000000000).toFixed(2).replace(/\.?0*$/,'') + 'pb'
            if (num >= 1000000000000)
                return (num / 1000000000000).toFixed(2).replace(/\.?0*$/,'') + 'tb'
            if (num >= 1000000000)
                return (num / 1000000000).toFixed(2).replace(/\.?0*$/,'') + 'gb'
            if (num >= 1000000)
                return (num / 1000000).toFixed(2).replace(/\.?0*$/,'') + 'mb'
            if (num >= 1000)
                return (num / 1000).toFixed(2).replace(/\.?0*$/,'') + 'kb'
            return num + 'b';
        },
        unitFormat(value) {
            let num = parseFloat(value);
            if (num >= 1000000000000000)
                return num / 1000000000000000 + 'q'
            if (num >= 1000000000000)
                return num / 1000000000000 + 't'
            if (num >= 1000000000)
                return num / 1000000000 + 'b'
            if (num >= 1000000)
                return num / 1000000 + 'm'
            if (num >= 1000)
                return num / 1000 + 'k'
            return num;
        },
    },
    created: function () {
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
                console.log(e)
                console.log('using default layout')
            }
        if (localStorage.refresh)
            store.commit('setRefresh', parseInt(localStorage.refresh))
        document.body.style.backgroundColor = store.getters.current.backgroundColor;
        if (localStorage.stats && store.getters.data.stats.length < 1)
            store.commit('setStats', JSON.parse(localStorage.stats))
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

new Vue({
    render: h => h(App),
    router,
    store,
    vuetify,
    grid,
    echarts,
}).$mount('#app')
