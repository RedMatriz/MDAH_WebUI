import Vue from 'vue';
import Vuex from 'vuex';
import {deconstructChart, constructChart} from "@/constants";

Vue.use(Vuex);

const state = {
    options: {
        current: 'light',
        hasBgImage: false,
        bgImage: 'https://images3.alphacoders.com/819/thumb-1920-819294.png',
        showAppBar: true,
    },
    themes: {
        light: {                                //internal name for theme
            backgroundAlpha: 'f0',              //the alpha to apply if a background exists
            backgroundColor: '#efeff0',         //background color
            textColor: '#202020',               //text color
            primary: '#fbfbfe',                 //color of page and side bars
            secondary: '#fafafa',               //color of title bars and content containers
            accent: '#717175',                  //misc, mainly used as a secondary text/icon color
            accent1: 'rgba(150,150,158, 0.3)',  //misc, mainly used as button color
            accent2: 'rgba(94,94,98,0.7)',      //misc
            green: '#00e000',                   //unused
            red: '#e00000',                     //unused
            yellow: '#e0e000',                  //unused
            isDark: false,                      //internal use only, will be removed
        },
        eyekiller: {  //internal name for theme
            backgroundAlpha: 'f0',              //the alpha to apply if a background exists
            backgroundColor: '#26ff00',         //background color
            textColor: '#000000',               //text color
            primary: '#ee00ff',                 //color of page and side bars
            secondary: '#ffc800',               //color of title bars and content containers
            accent: '#00aeff',                  //misc, mainly used as a secondary text/icon color
            accent1: 'rgba(255,0,0,0.3)',       //misc, mainly used as button color
            accent2: 'rgba(0,32,255,0.7)',      //misc
            green: '#00ff00',                   //unused
            red: '#ff0000',                     //unused
            yellow: '#ffff00',                  //unused
            isDark: false,                      //internal use only, will be removed
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
    layout: {
        grid: [],
        charts: [],
        tempoptions: {title: {text: 'title'}, legend: {show: true}},
        temppieoptions: {title: {text: 'title'}, legend: {show: true}},
    }
};

const defaultLayout = [
    {x: 0, y: 0, w: 3, h: 8, i: 0},
    {x: 3, y: 0, w: 9, h: 8, i: 1},
    {x: 0, y: 8, w: 6, h: 8, i: 2},
    {x: 6, y: 8, w: 6, h: 8, i: 3}];
const defaultCharts = [
    {
        type: 'pie',
        title: {
            left: 'center',
            text: 'Reliability',
        },
        legend: {
            orient: 'vertical',
            left: 0,
            show: true,
            data: ['Hits', 'Misses', 'Cached'],
        },
        series: [
            {
                type: 'pie',
                avoidLabelOverlap: true,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: 0,
                        name: 'Hits',
                        dataId: 'Hits',
                        itemStyle: {colorId: 'green'}
                    },
                    {
                        value: 0,
                        name: 'Misses',
                        dataId: 'Misses',
                        itemStyle: {colorId: 'red'}
                    },
                    {
                        value: 0,
                        name: 'Cached',
                        dataId: 'Browser Cached',
                        itemStyle: {colorId: 'accent'}
                    },
                ]
            }
        ]
    },
    {
        type: 'graph',
        title: {
            left: 'center',
            text: 'Bytes Sent',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    formatter: 'number'
                },
            }
        },
        legend: {
            left: 'center',
            top: 22,
            data: ['Total', 'Change'],
        },
        yAxis: [{
            type: 'value',
            name: 'Total',
            scale: true,
            axisLabel: {
                unit: 1
            },
            splitLine: {
                show: false
            }
        }, {
            type: 'value',
            name: 'Change',
            scale: true,
            axisLabel: {
                unit: 1
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
            name: 'Total',
            dataId: 'Bytes Sent',
            type: 'line',
            sampling: 'average',
            showSymbol: false,
            itemStyle: {
                colorId: 'text'
            },
        }, {
            name: 'Change',
            dataId: 'Change in Bytes Sent',
            yAxisIndex: 1,
            type: 'bar',
            itemStyle: {
                colorId: 'yellow'
            },
        }]
    }, {
        type: 'graph',
        title: {
            left: 'center',
            text: 'Requests Served',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    formatter: 'number'
                },
            }
        },
        legend: {
            left: 'center',
            top: 22,
            data: ['Total', 'Change'],
        },
        yAxis: [{
            type: 'value',
            name: 'Total',
            scale: true,
            axisLabel: {
                unit: 2
            },
            splitLine: {
                show: false
            }
        }, {
            type: 'value',
            name: 'Change',
            scale: true,
            axisLabel: {
                unit: 2
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
            name: 'Total',
            dataId: 'Requests Served',
            type: 'line',
            sampling: 'average',
            showSymbol: false,
            itemStyle: {
                colorId: 'text'
            },
        }, {
            name: 'Change',
            dataId: 'Change in Requests Served',
            yAxisIndex: 1,
            type: 'bar',
            itemStyle: {
                colorId: 'yellow'
            },
        }]
    }, {
        type: 'graph',
        title: {
            left: 'center',
            text: 'Cache Size',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    formatter: 'number'
                },
            }
        },
        legend: {
            left: 'center',
            top: 22,
            data: ['Total', 'Change'],
        },
        yAxis: [{
            type: 'value',
            name: 'Total',
            scale: true,
            axisLabel: {
                unit: 1
            },
            splitLine: {
                show: false
            }
        }, {
            type: 'value',
            name: 'Change',
            scale: true,
            axisLabel: {
                unit: 1
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
            name: 'Total',
            dataId: 'Bytes On Disk',
            type: 'line',
            sampling: 'average',
            showSymbol: false,
            itemStyle: {
                colorId: 'text'
            },
        }, {
            name: 'Change',
            dataId: 'Change in Bytes On Disk',
            yAxisIndex: 1,
            type: 'bar',
            itemStyle: {
                colorId: 'yellow'
            },
        }]
    },
];

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
    lastValueOf: (state) => (dataset) => state.data[dataset][state.data[dataset].length - 1] ? state.data[dataset][state.data[dataset].length - 1][1] : 0
};

const mutations = {
    setTheme(state, theme) {
        state.options.current = theme;
        localStorage.theme = theme;
        if (state.layout.charts.length > 0)
            state.layout.charts = JSON.parse(localStorage.dashboardCharts).map((x) => constructChart(x))
        document.body.style.backgroundColor = state.themes[state.options.current].backgroundColor;
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
        state.layout.grid = defaultLayout.map((x) => x);
        state.layout.charts = defaultCharts.map((x) => constructChart(x));
        localStorage.dashboardLayout = JSON.stringify(state.layout.grid)
        localStorage.dashboardCharts = JSON.stringify(state.layout.charts)
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
        localStorage.dashboardLayout = JSON.stringify(state.layout.grid)
    },
    setLayout(store, val) {
        store.layout.grid = val;
    },
    setChart(store, val) {
        store.layout.charts = val;
    },
    addLayoutContainer(store, val) {
        let id = store.layout.grid.length
        store.layout.grid.push({x: 0, y: 0, w: 8, h: 8, i: id})
        store.layout.charts.push(val)
        localStorage.dashboardCharts = JSON.stringify(store.layout.charts.map((x) => deconstructChart(x, x.type)))
        localStorage.dashboardLayout = JSON.stringify(state.layout.grid)
    },
    removeLayoutContainer(store, val) {
        store.layout.grid.splice(val, 1)
        store.layout.charts.splice(val, 1)
        store.layout.grid.forEach((x, idx) => x.i = idx)
        localStorage.dashboardCharts = JSON.stringify(store.layout.charts.map((x) => deconstructChart(x, x.type)))
        localStorage.dashboardLayout = JSON.stringify(state.layout.grid)
    },
    setHasBg(state, val) {
        state.options.hasBgImage = val;
        localStorage.hasBackground = state.options.hasBgImage;
    },
    setBgUrl(state, val) {
        state.options.bgImage = val;
        localStorage.backgroundURL = state.options.bgImage;
    },
    setRefresh(state, val) {
        if (isNaN(val) || val === '')
            val = 0
        state.data.updateInterval = Math.max(parseInt(val), 500);
        localStorage.refreshRate = state.data.updateInterval;
    },
    setTempOptions(state, val) {
        state.layout.tempoptions = val;
    },
    setTempPieOptions(state, val) {
        state.layout.temppieoptions = val;
    },
    setTempDatasets(state, val) {
        state.layout.tempoptions.series = val;
    },
    setLoaded(state, val) {
        state.loaded = val;
    },
    showAppBar(state, val) {
        state.options.showAppBar = val;
        localStorage.showAppBar = state.options.showAppBar;
    },
    setMaxStorePoints(state, val) {
        if (isNaN(val) || val === '')
            val = 0
        state.data.maxStorePoints = Math.max(parseInt(val), 181);
        localStorage.maxDataPoints = state.data.maxStorePoints;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
});