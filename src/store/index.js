import Vue from 'vue';
import Vuex from 'vuex';
import {deconstructChart, constructChart, float} from "@/constants";
import moment from "moment";

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
            backgroundColor: '#000',
            textColor: '#d0d0d0',
            primary: '#191919',
            secondary: '#212122',
            accent: '#9d9da0',
            accent1: 'rgba(255,255,255,0.3)',
            accent2: 'rgba(95,95,100,0.7)',
            green: '#00a000',
            red: '#a00000',
            yellow: '#a0a000',
            isDark: true,
        },
    },
    data: {
        datasets: {},
        stats: [],
        updateInterval: 2000,
        maxStorePoints: 1801,
    },
    layout: {
        grid: [],
        charts: [],
        tempoptions: {title: {text: 'title'}, legend: {show: true}},
        temppieoptions: {title: {text: 'title'}, legend: {show: true}},
    },
    console: {
        data: [],
        maxLines: 1000
    }
};

const defaultLayout = [
    {x: 0, y: 0, w: 24, h: 8, i: 0},
    {x: 0, y: 8, w: 5, h: 8, i: 1},
    {x: 5, y: 8, w: 11, h: 8, i: 2},
    {x: 16, y: 8, w: 8, h: 8, i: 3}];
const defaultCharts = [
    {
        type: 'graph',
        title: {left: 'center', text: 'Requests'},
        tooltip: {trigger: 'axis', axisPointer: {type: 'cross', label: {formatter: 'number'}}},
        legend: {left: 'center', show: true, top: 35, data: ['Requests', 'Hits', 'Misses']},
        yAxis: [{
            type: 'value',
            name: 'Change/s',
            scale: true,
            offset: 0,
            axisLabel: {unit: 2},
            splitLine: {show: false}
        }],
        series: [{
            name: 'Requests',
            type: 'line',
            data: null,
            dataId: 'Change in Requests Served',
            yAxisIndex: 0,
            showSymbol: false,
            itemStyle: {colorId: 'text'}
        }, {
            name: 'Hits',
            type: 'line',
            data: null,
            dataId: 'Change in Hits',
            yAxisIndex: 0,
            showSymbol: false,
            itemStyle: {colorId: 'green'}
        }, {
            name: 'Misses',
            type: 'line',
            data: null,
            dataId: 'Change in Misses',
            yAxisIndex: 0,
            showSymbol: false,
            itemStyle: {colorId: 'red'}
        }]
    },
    {
        type: 'pie',
        title: {
            left: 'center',
            text: 'Reliability',
        },
        legend: {
            orient: 'vertical',
            left: 0,
            top: 10,
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
            top: 35,
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
            name: 'Change/s',
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
            type: 'line',
            showSymbol: false,
            itemStyle: {
                colorId: 'yellow'
            },
        }]
    },
    // {
    //     type: 'graph',
    //     title: {
    //         left: 'center',
    //         text: 'Requests Served',
    //     },
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'cross',
    //             label: {
    //                 formatter: 'number'
    //             },
    //         }
    //     },
    //     legend: {
    //         left: 'center',
    //         top: 22,
    //         data: ['Total', 'Change'],
    //     },
    //     yAxis: [{
    //         type: 'value',
    //         name: 'Total',
    //         scale: true,
    //         axisLabel: {
    //             unit: 2
    //         },
    //         splitLine: {
    //             show: false
    //         }
    //     }, {
    //         type: 'value',
    //         name: 'Change',
    //         scale: true,
    //         axisLabel: {
    //             unit: 2
    //         },
    //         splitLine: {
    //             show: false
    //         }
    //     }],
    //     series: [{
    //         name: 'Total',
    //         dataId: 'Requests Served',
    //         type: 'line',
    //         sampling: 'average',
    //         showSymbol: false,
    //         itemStyle: {
    //             colorId: 'text'
    //         },
    //     }, {
    //         name: 'Change',
    //         dataId: 'Change in Requests Served',
    //         yAxisIndex: 1,
    //         type: 'bar',
    //         itemStyle: {
    //             colorId: 'yellow'
    //         },
    //     }]
    // },
    {
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
            top: 35,
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
            name: 'Change/s',
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
            dataId: 'Cache Size',
            type: 'line',
            sampling: 'average',
            showSymbol: false,
            itemStyle: {
                colorId: 'text'
            },
        }, {
            name: 'Change',
            dataId: 'Change in Cache Size',
            yAxisIndex: 1,
            type: 'line',
            showSymbol: false,
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
    getDataset: state => dataset => state.data.datasets[dataset],
    getLastValueOfDataset: state => dataset => state.data.datasets[dataset] ?
        (state.data.datasets[dataset][state.data.datasets[dataset].length - 1] ?
            state.data.datasets[dataset][state.data.datasets[dataset].length - 1][1] : 0) : 0,
    layout: state => state.layout,
    console: state => state.console,
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
    setDatasets(state, val) {
        state.data.datasets = val
    },
    updateDatasets(state, val) {
        // val should be a stat object
        let stat = JSON.parse(val)
        let datasets = state.data.datasets
        // dataset keys
        let timestamp = Object.keys(stat)[0]
        let statKeys = Object.keys(stat[timestamp])
        let timeDate = new Date(moment(timestamp) + 0)
        statKeys.forEach((x) => {
            if (!datasets[x]) {
                datasets[x] = []
                datasets[x + '_c'] = []
            }
            let lastPair = datasets[x].length > 0 ? datasets[x][datasets[x].length - 1] : null
            datasets[x].push([timeDate, stat[timestamp][x]])
            if (lastPair != null) // calculation of change / second
                datasets[x + '_c'].push([timeDate, float((stat[timestamp][x] - lastPair[1]) / (moment(timestamp) - moment(lastPair[0])) * 1000, 4)])
            else
                datasets[x + '_c'].push([timeDate, 0])
            if (datasets[x].length > state.data.maxStorePoints) {
                datasets[x].shift()
                datasets[x + '_c'].shift()
            }
        })
    },
    pushStats(state, val) {
        state.data.stats.push(val);
        if (state.data.stats.length > state.data.maxStorePoints) {
            state.data.stats.splice(0, state.data.stats.length - state.data.maxStorePoints)
        }
    },
    spliceStats(state, val) {
        state.data.stats.splice(val[0], 0, val[1]);
        if (state.data.stats.length > state.data.maxStorePoints) {
            state.data.stats.splice(0, state.data.stats.length - state.data.maxStorePoints)
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
        state.layout.grid = defaultLayout.map((x,) => {
            return {x: x.x, y: x.y, w: x.w, h: x.h, i: 3 - x.i}
        });
        state.layout.charts = defaultCharts.map((x) => constructChart(x));
        localStorage.dashboardLayout = JSON.stringify(state.layout.grid)
        localStorage.dashboardCharts = JSON.stringify(state.layout.charts)
    },
    setSpecificLayout(store, val) {
        let index = 0;
        store.layout.grid.forEach((x, idx) => {
            if (x.i === val.i) index = idx
        })
        if (val.w != null)
            store.layout.grid[index].w = val.w;
        if (val.h != null)
            store.layout.grid[index].h = val.h;
        if (val.x != null)
            store.layout.grid[index].x = val.x;
        if (val.y != null)
            store.layout.grid[index].y = val.y;
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
        let ids = []
        store.layout.grid.forEach((x) => ids.push(x.i))
        for (let i = 0; i < ids.length; i++)
            if (!ids.includes(i)) {
                id = i
                break
            }
        store.layout.grid.push({x: 0, y: 0, w: 8, h: 8, i: id})
        store.layout.charts.push(val)
        localStorage.dashboardCharts = JSON.stringify(store.layout.charts.map((x) => deconstructChart(x, x.type)))
        localStorage.dashboardLayout = JSON.stringify(state.layout.grid)
    },
    removeLayoutContainer(store, val) {
        store.layout.grid.splice(val, 1)
        store.layout.charts.splice(val, 1)
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
    showAppBar(state, val) {
        state.options.showAppBar = val;
        localStorage.showAppBar = state.options.showAppBar;
    },
    setMaxStorePoints(state, val) {
        if (isNaN(val) || val === '')
            val = 0
        state.data.maxStorePoints = Math.max(parseInt(val), 181);
        localStorage.maxDataPoints = state.data.maxStorePoints;
    },
    setConsoleData(state, val) {
        state.console.data = val
    },
    pushConsoleLine(state, val) {
        state.console.data.push(val)
        if (state.console.data.length > state.console.maxLines)
            state.console.data.splice(0, state.console.data.length - state.console.maxLines)
        localStorage.consoleLines = JSON.stringify(state.console.data)
    },
    setMaxConsoleLines(state, val) {
        state.console.maxLines = val;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
});