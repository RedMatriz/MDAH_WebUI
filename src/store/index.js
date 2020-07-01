import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
    options: {
        current: 'light',
        hasBgImage: false,
        bgImage: 'https://images3.alphacoders.com/819/thumb-1920-819294.png',
        showAppBar: true,
    },
    themes: {
        light: {
            backgroundAlpha: 'f0',
            backgroundColor: '#efeff0',
            textColor: '#202020',
            primary: '#fbfbfe',
            secondary: '#fafafa',
            accent: '#717175',
            accent1: 'rgba(150,150,158, 0.3)',
            accent2: 'rgba(94,94,98,0.7)',
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
            isDark: false,
        },
        dark: {
            backgroundAlpha: 'f0',
            backgroundColor: '#353536',
            textColor: '#f0f0f0',
            primary: '#505053',
            secondary: '#454547',
            accent: '#606065',
            accent1: 'rgba(200,200,210,0.3)',
            accent2: 'rgba(200,200,210,0.7)',
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
            isDark: true,
        },
        midnight: {
            backgroundAlpha: 'f0',
            backgroundColor: '#111',
            textColor: '#dfdfdf',
            primary: '#202020',
            secondary: '#232323',
            accent: '#a0a0a0',
            accent1: 'rgba(255,255,255,0.3)',
            accent2: 'rgba(95,95,95,0.7)',
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
            isDark: true,
        },
    },
    data: {
        date: [],
        bytesSent: [],
        bytesSentChange: [],
        sizeDisk: [],
        sizeDiskChange: [],
        reqServ: [],
        reqServChange: [],
        hits: [],
        hitsChange: [],
        misses: [],
        missesChange: [],
        cached: [],
        cachedChange: [],
        stats: [],
        updateInterval: 2000,
        maxStorePoints: 1801,
    },
    loaded: false,
    layout: {
        grid: [
            {x: 0, y: 0, w: 3, h: 8, i: 0, o: {}},
            {x: 3, y: 0, w: 9, h: 8, i: 1, o: {}},
            {x: 0, y: 8, w: 6, h: 8, i: 2, o: {}},
            {x: 6, y: 8, w: 6, h: 8, i: 3, o: {}}],
        tempoptions: {title: {text: 'title'}},
        temppieoptions: {},
    }
};

const getters = {
    current: state => state.themes[state.options.current],
    options: state => state.options,
    hasBgImage: state => state.options.hasBgImage,
    bgImg: state => state.options.bgImage,
    showAppBar: state => state.options.showAppBar,
    alpha: state => {
        return (state.options.hasBgImage ? state.themes[state.options.current].backgroundAlpha : '')
    },
    data: state => state.data,
    layout: state => state.layout,
    loaded: state => state.loaded
};

const defaultLayout = [
    {x: 0, y: 0, w: 3, h: 8, i: 0},
    {x: 3, y: 0, w: 9, h: 8, i: 1},
    {x: 0, y: 8, w: 6, h: 8, i: 2},
    {x: 6, y: 8, w: 6, h: 8, i: 3}];

const mutations = {
    setTheme(state, theme) {
        state.options.current = theme;
    },
    setStats(state, val) {
        state.data.stats = val;
    },
    pushStats(state, val) {
        state.data.stats.push(val);
        if (state.data.stats.length > state.data.maxStorePoints) {
            state.data.stats.splice(0, state.data.stats.length - state.data.maxStorePoints)
        }
    },
    pushDate(state, val) {
        state.data.date.push(val);
        if (state.data.date.length > state.data.maxStorePoints) {
            state.data.date.splice(0, state.data.date.length - state.data.maxStorePoints)
        }
    },
    pushBytesSent(state, val) {
        state.data.bytesSent.push(val);
        while (state.data.bytesSent.length > state.data.maxStorePoints) {
            state.data.bytesSent.splice(0, state.data.bytesSent.length - state.data.maxStorePoints)
        }
    },
    pushBytesSentChange(state, val) {
        state.data.bytesSentChange.push(val);
        while (state.data.bytesSentChange.length > state.data.maxStorePoints) {
            state.data.bytesSentChange.splice(0, state.data.bytesSentChange.length - state.data.maxStorePoints)
        }
    },
    pushReqServ(state, val) {
        state.data.reqServ.push(val);
        if (state.data.reqServ.length > state.data.maxStorePoints) {
            state.data.reqServ.splice(0, state.data.reqServ.length - state.data.maxStorePoints)
        }
    },
    pushReqServChange(state, val) {
        state.data.reqServChange.push(val);
        if (state.data.reqServChange.length > state.data.maxStorePoints) {
            state.data.reqServChange.splice(0, state.data.reqServChange.length - state.data.maxStorePoints)
        }
    },
    pushSizeDisk(state, val) {
        state.data.sizeDisk.push(val);
        if (state.data.sizeDisk.length > state.data.maxStorePoints) {
            state.data.sizeDisk.splice(0, state.data.sizeDisk.length - state.data.maxStorePoints)
        }
    },
    pushSizeDiskChange(state, val) {
        state.data.sizeDiskChange.push(val);
        if (state.data.sizeDiskChange.length > state.data.maxStorePoints) {
            state.data.sizeDiskChange.splice(0, state.data.sizeDiskChange.length - state.data.maxStorePoints)
        }
    },
    pushHits(state, val) {
        state.data.hits.push(val);
        if (state.data.hits.length > state.data.maxStorePoints) {
            state.data.hits.splice(0, state.data.hits.length - state.data.maxStorePoints)
        }
    },
    pushHitsChange(state, val) {
        state.data.hitsChange.push(val);
        if (state.data.hitsChange.length > state.data.maxStorePoints) {
            state.data.hitsChange.splice(0, state.data.hitsChange.length - state.data.maxStorePoints)
        }
    },
    pushMisses(state, val) {
        state.data.misses.push(val);
        if (state.data.misses.length > state.data.maxStorePoints) {
            state.data.misses.splice(0, state.data.misses.length - state.data.maxStorePoints)
        }
    },
    pushMissesChange(state, val) {
        state.data.missesChange.push(val);
        if (state.data.missesChange.length > state.data.maxStorePoints) {
            state.data.missesChange.splice(0, state.data.missesChange.length - state.data.maxStorePoints)
        }
    },
    pushCached(state, val) {
        state.data.cached.push(val);
        if (state.data.cached.length > state.data.maxStorePoints) {
            state.data.cached.splice(0, state.data.cached.length - state.data.maxStorePoints)
        }
    },
    pushCachedChange(state, val) {
        state.data.cachedChange.push(val);
        if (state.data.cachedChange.length > state.data.maxStorePoints) {
            state.data.cachedChange.splice(0, state.data.cachedChange.length - state.data.maxStorePoints)
        }
    },
    resetStats(state) {
        state.data = {
            date: [],
            bytesSent: [],
            bytesSentChange: [],
            sizeDisk: [],
            sizeDiskChange: [],
            reqServ: [],
            reqServChange: [],
            hits: [],
            hitsChange: [],
            misses: [],
            missesChange: [],
            cached: [],
            cachedChange: [],
            stats: [],
            updateInterval: state.data.updateInterval,
            maxStorePoints: state.data.maxStorePoints,
        }
        localStorage.stats = '';
    },
    resetLayout(state) {
        state.layout.grid = defaultLayout;
        localStorage.layout = JSON.stringify(state.data.layout)
    },
    setSpecificLayout(store, val) {
        if (val.w != null)
            store.layout.grid[val.i].w = val.w;
        if (val.h != null)
            store.layout.grid[val.i].h = val.h;
        if (val.x != null)
            store.layout.grid[val.i].x = val.x;
        if (val.y != null)
            store.layout.grid[val.i].y = val.y;
    },
    setLayout(store, val) {
        store.layout.grid = val;
    },
    setHasBg(state, val) {
        state.options.hasBgImage = val;
    },
    setBgUrl(state, val) {
        state.options.bgImage = val;
    },
    setRefresh(state, val) {
        state.data.updateInterval = val;
    },
    setTempOptions(state, val) {
        state.layout.tempoptions = val;
    },
    setTempDatasets(state, val) {
        state.layout.tempoptions.series = val;
    },
    setLoaded(state, val) {
        state.loaded = val;
    },
    showAppBar(state, val) {
        state.options.showAppBar = val;
    },
    setMaxStorePoints(state, val) {
        state.data.maxStorePoints = val;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
});