import store from "@/store";
import moment from "moment";

const dictionary = {
    //data id
    requests_served: 'Requests Served',
    requests_served_c: 'Change in Requests Served',
    cache_hits: 'Hits',
    cache_hits_c: 'Change in Hits',
    cache_misses: 'Misses',
    cache_misses_c: 'Change in Misses',
    browser_cached: 'Browser Cached',
    browser_cached_c: 'Change in Browser Cached',
    bytes_sent: 'Bytes Sent',
    bytes_sent_c: 'Change in Bytes Sent',
    bytes_on_disk: 'Cache Size',
    bytes_on_disk_c: 'Change in Cache Size',
    //color id
    // background: store.getters.current.backgroundColor,
    // text: store.getters.current.textColor,
    // primary: store.getters.current.primary,
    // secondary: store.getters.current.secondary,
    // accent: store.getters.current.accent,
    // accent1: store.getters.current.accent1,
    // accent2: store.getters.current.accent2,
    // red: store.getters.current.red,
    // yellow: store.getters.current.yellow,
    // green: store.getters.current.green,
}
export const dataUnits = ['YB', 'ZB', 'EB', 'PB', 'TB', 'GB', 'MB', 'KB', 'B']
export const numberUnits = ['d', 'n', 'o', 'S', 's', 'Q', 'q', 't', 'B', 'M', 'K', '']
export const biscuitUnits = ['YottaBiscuits', 'ZettaBiscuits', 'ExaBiscuits', 'PetaBiscuits', 'TeraBiscuits', 'GigaBiscuits', 'MegaBiscuits', 'KiloBiscuits', 'Biscuits']
export const formatNumber = (value, units, flot) => {
    let num = Math.abs(parseFloat(value));
    let sign = parseFloat(value) > 0 ? 1 : -1
    for (let i = 0; i < units.length; i++) {
        let div = Math.pow(10, (units.length - i - 1) * 3);
        if (num >= div)
            return float(num / div * sign, flot) + ' ' + units[i]
    }
    return float(num * sign, flot)
}
export const units = [[], dataUnits, numberUnits, biscuitUnits]

function translateColor(input) {
    switch (input) {
        case 'background':
            return store.getters.current.backgroundColor
        case 'text':
            return store.getters.current.textColor
        case 'primary':
            return store.getters.current.primary
        case 'secondary':
            return store.getters.current.secondary
        case 'active':
            return store.getters.current.active
        case 'accent':
            return store.getters.current.accent
        case 'accent1':
            return store.getters.current.accent1
        case 'accent2':
            return store.getters.current.accent2
        case 'red':
            return store.getters.current.red
        case 'green':
            return store.getters.current.green
        case 'yellow':
            return store.getters.current.yellow
        default:

    }
}

export const translate = (input, reverse) => {
    let translation;
    if (reverse) {
        Object.keys(dictionary).forEach((x) => {
            if (dictionary[x] === input)
                translation = x
        })
        return translation ? translation : input
    } else {
        translation = dictionary[input]
        return translation ? translation : input
    }
}

export const getLightness = (H) => {
    let r = "0x" + H[1] + H[2];
    let g = "0x" + H[3] + H[4];
    let b = "0x" + H[5] + H[6];
    r /= 255;
    g /= 255;
    b /= 255;
    let l = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
    l = +(l * 100).toFixed(1);
    return l;
}

export const constructChart = (storedConfig) => {
    let temp = JSON.parse(JSON.stringify(storedConfig));
    if (storedConfig.type === 'graph') {
        temp.title.textStyle = {
            color: store.getters.current.textColor
        }
        temp.backgroundColor = store.getters.current.secondary
        temp.title.top = 4
        temp.toolbox = {
            orient: 'horizontal',
            top: 2,
            right: 0,
            iconStyle: {
                color: store.getters.current.accent2,
                borderColor: '#00000000'
            },
            emphasis: {
                iconStyle: {
                    textPosition: 'left',
                    color: store.getters.current.textColor,
                    textBackgroundColor: store.getters.current.secondary,
                    borderColor: '#00000000'
                }
            },
            feature: {
                dataZoom: {
                    show: true,
                    yAxisIndex: 'none',
                    icon: {
                        zoom: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
                        back: 'M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z'
                    },
                    title: {
                        zoom: 'Zoom',
                        back: "Undo"
                    }
                },
                restore: {
                    title: 'Restore',
                    icon: 'M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z',
                },
                saveAsImage: {
                    show: true,
                    title: 'Save',
                    icon: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z'
                },
            }
        }
        let offadd = 0
        temp.yAxis.forEach((x) => {
            offadd += x.offset ? x.offset : 0
        })
        temp.grid = {
            right: 30 + offadd,
            left: 30,
            bottom: store.getters.options.exp_showSlider ? 40 : 10,
            top: 60,
            containLabel: true,
        };
        temp.legend.inactiveColor = store.getters.current.accent2;
        temp.legend.textStyle = {color: store.getters.current.textColor};
        temp.xAxis = {
            type: 'time',
            axisLine: {
                lineStyle: {
                    color: store.getters.current.textColor
                }
            },
            splitLine: {
                lineStyle: {
                    color: store.getters.current.accent1
                }
            },
            axisLabel: {
                formatter: (value) => moment(value).format('MMM D|h:mma').replace('|', '\n'),
                splitNumber: 10,
                showMaxLabel: true,
                showMinLabel: true,
            },
            // value: store.getters.data.date
        }
        temp.yAxis.forEach((x) => {
            x.axisLine = {
                lineStyle: {
                    color: store.getters.current.textColor
                }
            };
            x.axisLabel.formatter = (val) => formatNumber(val, units[x.axisLabel.unit], 2)
        })
        temp.tooltip = {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    color: store.getters.current.secondary,
                }
            },
            textStyle: {
                color: store.getters.current.secondary,
            },
            backgroundColor: store.getters.current.textColor + 'f0'
        };
        temp.tooltip.axisPointer.label.formatter = (point) => {
            if (point.axisDimension === 'x' && point.seriesData[0] && point.seriesData[0].data) {
                return moment(point.seriesData[0].data[0]).format('MMM D, h:mm:ssa')
            }
            return formatNumber(point.value, units[temp.yAxis[point.axisIndex].axisLabel.unit], 4)
        }
        temp.series.forEach((x) => {
            if (x.dataId)
                x.data = store.getters.getDataset(translate(x.dataId, true))
            x.areaStyle = {opacity: 0.05}
            if (x.itemStyle.colorId)
                x.itemStyle.color = translateColor(x.itemStyle.colorId)
        })
        temp.dataZoom = [{
            type: 'inside',
        }, {
            show: store.getters.options.exp_showSlider,
            type: 'slider',
            handleSize: '100%',
            fillerColor: store.getters.current.accent1,
            handleStyle: {
                color: store.getters.current.textColor,
            },
            dataBackground: {
                lineStyle: {
                    color: store.getters.current.textColor
                },
                areaStyle: {
                    color: store.getters.current.accent
                }
            },
            textStyle: {
                color: store.getters.current.textColor
            },
        }];
        store.watch((state) => state.options.exp_showSlider, () => {
            temp.dataZoom[1].show = store.getters.options.exp_showSlider
            temp.grid.bottom = store.getters.options.exp_showSlider ? 40 : 10
        })
        store.watch((state) => state.options.current, (theme) => {
            temp.dataZoom[1].fillerColor = store.getters.themes[theme].accent1
            temp.dataZoom[1].textStyle.color = store.getters.themes[theme].textColor
            temp.dataZoom[1].dataBackground.areaStyle.color = store.getters.themes[theme].accent
            temp.dataZoom[1].dataBackground.lineStyle.color = store.getters.themes[theme].textColor
            temp.dataZoom[1].handleStyle.color = store.getters.themes[theme].textColor
            temp.series.forEach((x) => {
                if (x.itemStyle.colorId)
                    x.itemStyle.color = translateColor(x.itemStyle.colorId)
            })
            temp.yAxis.forEach((x) => {
                x.axisLine.lineStyle.color = store.getters.themes[theme].textColor;
            })
            temp.xAxis.splitLine.lineStyle.color = store.getters.themes[theme].accent1
            temp.xAxis.axisLine.lineStyle.color = store.getters.themes[theme].textColor
            temp.tooltip.axisPointer.label.color = store.getters.themes[theme].secondary
            temp.tooltip.textStyle.color = store.getters.themes[theme].secondary
            temp.tooltip.backgroundColor = store.getters.themes[theme].textColor + 'f0'
            temp.legend.inactiveColor = store.getters.themes[theme].accent2;
            temp.legend.textStyle.color = store.getters.themes[theme].textColor;
            temp.toolbox.iconStyle.color = store.getters.themes[theme].accent2;
            temp.toolbox.emphasis.iconStyle.color = store.getters.themes[theme].textColor;
            temp.toolbox.emphasis.iconStyle.textBackgroundColor = store.getters.themes[theme].secondary;
            temp.title.textStyle.color = store.getters.themes[theme].textColor
            temp.backgroundColor = store.getters.themes[theme].secondary
        })
        return temp
    } else if (storedConfig.type === 'pie') {
        temp.title.textStyle = {
            color: store.getters.current.textColor
        }
        temp.backgroundColor = store.getters.current.secondary
        temp.toolbox = {
            orient: 'vertical',
            top: 2,
            right: 0,
            iconStyle: {
                color: store.getters.current.accent2,
                borderColor: '#00000000'
            },
            emphasis: {
                iconStyle: {
                    textPosition: 'left',
                    color: store.getters.current.textColor,
                    textBackgroundColor: store.getters.current.secondary,
                    borderColor: '#00000000'
                }
            },
            feature: {
                saveAsImage: {
                    show: true,
                    title: 'Save',
                    icon: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z'
                }
            }
        }
        temp.title.top = 4
        temp.legend.inactiveColor = store.getters.current.accent2;
        temp.legend.textStyle = {color: store.getters.current.textColor};
        temp.tooltip = {
            trigger: 'item',
            formatter: ' {b}<br/>{c} ({d}%)',
            textStyle: {
                color: store.getters.current.secondary,
            },
            backgroundColor: store.getters.current.textColor + 'f0'
        }
        temp.series[0].data.forEach((x) => {
            if (x.dataId)
                x.value = store.getters.getLastValueOfDataset(translate(x.dataId, true))
            if (x.itemStyle.colorId)
                x.itemStyle.color = translateColor(x.itemStyle.colorId)
        })
        store.watch((state) => state.options.current, (theme) => {
            temp.series[0].data.forEach((x) => {
                if (x.itemStyle.colorId)
                    x.itemStyle.color = translateColor(x.itemStyle.colorId)
            })
            temp.tooltip.textStyle.color = store.getters.themes[theme].secondary
            temp.tooltip.backgroundColor = store.getters.themes[theme].textColor + 'f0'
            temp.legend.inactiveColor = store.getters.themes[theme].accent2;
            temp.legend.textStyle.color = store.getters.themes[theme].textColor;
            temp.toolbox.iconStyle.color = store.getters.themes[theme].accent2;
            temp.toolbox.emphasis.iconStyle.color = store.getters.themes[theme].textColor;
            temp.toolbox.emphasis.iconStyle.textBackgroundColor = store.getters.themes[theme].secondary;
            temp.title.textStyle.color = store.getters.themes[theme].textColor
            temp.backgroundColor = store.getters.themes[theme].secondary
        })
        return temp
    }
    return {}
}

export const deconstructChart = (config, type) => {
    if (type === 'graph') {
        let exp = {
            type: type,
            title: {
                left: 'center',
                text: config.title.text
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
                left: config.legend.left,
                show: config.legend.show,
                top: config.legend.top,
                data: config.legend.data,
            },
            yAxis: config.yAxis.map((x) => {
                return {
                    type: 'value',
                    name: x.name,
                    scale: true,
                    offset: x.offset ? x.offset : 0,
                    axisLabel: {
                        unit: x.axisLabel.unit
                    },
                    splitLine: {
                        show: false
                    }
                }
            }),
            series: config.series.map((x) => {
                return {
                    name: x.name,
                    type: x.type,
                    data: null,
                    dataId: x.dataId,
                    yAxisIndex: x.yAxisIndex,
                    showSymbol: false,
                    itemStyle: {
                        color: x.itemStyle.color,
                        colorId: x.colorId,
                    }
                }
            })
        }
        return exp
    } else if (type === 'pie') {
        let exp = {
            type: type,
            title: {
                left: 'center',
                text: config.title.text
            },
            legend: {
                orient: 'vertical',
                left: config.legend.left,
                show: config.legend.show,
                top: config.legend.top,
                data: config.legend.data,
            },
            series: [{
                type: 'pie',
                avoidLabelOverlap: true,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                data: config.series[0].data.map((x) => {
                    return {
                        name: x.name,
                        value: 0,
                        dataId: x.dataId,
                        itemStyle: {color: x.itemStyle.color}
                    }
                })
            }]
        }
        return exp
    }
}

//jsonString should be an array of objects
export const importData = (jsonString) => {
    let imported = JSON.parse(jsonString)
    // Object.keys(imported[0])[0] returns the date key at the beginning of each object
    // keys is the data keys of the first object
    let keys = Object.keys(imported[0][Object.keys(imported[0])[0]])
    let data = {}
    // initiate data with the the keys from the first stat object
    keys.forEach((x) => {
        data[x] = []
        data[x + '_c'] = []
    });
    imported.forEach((stat, index) => {
        // dataset keys
        let previousTimestamp = index > 0 ? Object.keys(imported[index - 1])[0] : null
        let previousStat = index > 0 ? imported[index - 1] : null
        let timestamp = Object.keys(stat)[0]
        let statKeys = Object.keys(stat[timestamp])
        let timeDate = new Date(moment(timestamp) + 0)

        statKeys.forEach((x) => {
            data[x].push([timeDate, stat[timestamp][x]])
            if (previousTimestamp != null) // calculation of change / second
                data[x + '_c'].push([timeDate, float((stat[timestamp][x] - previousStat[previousTimestamp][x]) / (moment(timestamp) - moment(previousTimestamp)) * 1000, 4)])
            else
                data[x + '_c'].push([timeDate, 0])
        })
    })
    return data
}

export const sortData = () => {
    let stats = store.getters.data.stats;
    store.commit('setStats', quickSort(stats));
    // store.getters.data.stats.forEach((x) => console.log(Object.keys(x)[0]))
    localStorage.stats = JSON.stringify(store.getters.data.stats);

    function quickSort(origArray) {
        if (origArray.length <= 1) {
            return origArray;
        } else {
            let left = [];
            let right = [];
            let pivot = origArray.pop();
            let length = origArray.length;
            for (let i = 0; i < length; i++) {
                if (moment(Object.keys(origArray[i])[0]) <= moment(Object.keys(pivot)[0])) {
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
}

export const interpolateData = (thresholdMS, tolerance) => {
    let stats = store.getters.data.stats.map(x => x);
    for (let index = 0; index < stats.length; index++) {
        let currStat = stats[index]
        let nextStat = index < stats.length - 1 ? stats[index + 1] : null;
        let currTS = Object.keys(currStat)[0]
        let nextTS = nextStat ? Object.keys(nextStat)[0] : null
        let fill = {}
        if (nextStat)
            if (moment(nextTS) - moment(currTS) - thresholdMS > tolerance) {
                let datasets = Object.keys(currStat[currTS])
                datasets.forEach((x) => {
                    let numPoints = ((moment(nextTS) - moment(currTS)) / thresholdMS)
                    if (moment(nextTS) - moment(currTS) - thresholdMS > store.getters.data.updateInterval * store.getters.data.maxStorePoints) {
                        fill[x] = parseInt((currStat[currTS][x] + (nextStat[nextTS][x] - currStat[currTS][x]) / numPoints * ((moment(nextTS).subtract(store.getters.data.updateInterval * store.getters.data.maxStorePoints, 'ms') - moment(currTS)) / thresholdMS)))
                    } else
                        fill[x] = parseInt((currStat[currTS][x] + (nextStat[nextTS][x] - currStat[currTS][x]) / numPoints))
                })
                if (moment(nextTS) - moment(currTS) - thresholdMS > store.getters.data.updateInterval * store.getters.data.maxStorePoints)
                    stats.splice(index + 1, 0, JSON.parse('{"' + new Date(moment(nextTS).subtract(store.getters.data.updateInterval * store.getters.data.maxStorePoints, 'ms') + 0).toISOString() + '": ' +
                        JSON.stringify(fill) + ',"interpolated" : "true"}'))
                else
                    stats.splice(index + 1, 0, JSON.parse('{"' + new Date(moment(currTS).add(thresholdMS, 'ms') + 0).toISOString() + '": ' +
                        JSON.stringify(fill) + ',"interpolated" : "true"}'))
            }
    }
    if (stats.length > store.getters.data.maxStorePoints) {
        stats.splice(0, stats.length - store.getters.data.maxStorePoints)
    }
    store.commit('setStats', stats)
    localStorage.stats = JSON.stringify(store.getters.data.stats);
}

export const float = (number, x) => {
    return number.toFixed(x ? x : 2).replace(/\.?0*$/, '')
}

//purely internal testing data

export const testData = {
    "2020-07-05T23:15:36.652Z": {
        "requests_served": 4182126,
        "cache_hits": 3621024,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414940443344,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:15:51.908Z": {
        "requests_served": 4182154,
        "cache_hits": 3621052,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414957657619,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:16:06.908Z": {
        "requests_served": 4182155,
        "cache_hits": 3621053,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414958170243,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:16:21.909Z": {
        "requests_served": 4182157,
        "cache_hits": 3621055,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414959158619,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:16:36.908Z": {
        "requests_served": 4182165,
        "cache_hits": 3621063,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414962106228,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:16:51.908Z": {
        "requests_served": 4182175,
        "cache_hits": 3621073,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414965491153,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:17:06.908Z": {
        "requests_served": 4182184,
        "cache_hits": 3621082,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414967313062,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:17:21.908Z": {
        "requests_served": 4182186,
        "cache_hits": 3621084,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414967987544,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:17:36.908Z": {
        "requests_served": 4182191,
        "cache_hits": 3621089,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414970517036,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:17:51.908Z": {
        "requests_served": 4182193,
        "cache_hits": 3621091,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414971232372,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:18:06.908Z": {
        "requests_served": 4182194,
        "cache_hits": 3621092,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414971579754,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:18:21.908Z": {
        "requests_served": 4182196,
        "cache_hits": 3621094,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972276725,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:18:36.908Z": {
        "requests_served": 4182196,
        "cache_hits": 3621094,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972276725,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:18:51.908Z": {
        "requests_served": 4182196,
        "cache_hits": 3621094,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972276725,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:19:06.908Z": {
        "requests_served": 4182196,
        "cache_hits": 3621094,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972276725,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:19:21.908Z": {
        "requests_served": 4182200,
        "cache_hits": 3621098,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972730407,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:19:36.908Z": {
        "requests_served": 4182200,
        "cache_hits": 3621098,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972730407,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:19:51.908Z": {
        "requests_served": 4182200,
        "cache_hits": 3621098,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972730407,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:20:06.908Z": {
        "requests_served": 4182200,
        "cache_hits": 3621098,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972730407,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:20:21.908Z": {
        "requests_served": 4182200,
        "cache_hits": 3621098,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414972730407,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:20:36.908Z": {
        "requests_served": 4182217,
        "cache_hits": 3621115,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414977047140,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:20:51.908Z": {
        "requests_served": 4182235,
        "cache_hits": 3621133,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414981738726,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:21:06.908Z": {
        "requests_served": 4182239,
        "cache_hits": 3621137,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414982184961,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:21:21.908Z": {
        "requests_served": 4182269,
        "cache_hits": 3621167,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414985884976,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:21:36.908Z": {
        "requests_served": 4182269,
        "cache_hits": 3621167,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414985884976,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:21:51.908Z": {
        "requests_served": 4182269,
        "cache_hits": 3621167,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414985884976,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:22:06.908Z": {
        "requests_served": 4182269,
        "cache_hits": 3621167,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414985884976,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:22:21.908Z": {
        "requests_served": 4182269,
        "cache_hits": 3621167,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414985884976,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:22:36.908Z": {
        "requests_served": 4182269,
        "cache_hits": 3621167,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414985884976,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:22:51.908Z": {
        "requests_served": 4182277,
        "cache_hits": 3621175,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2414996717694,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:23:06.908Z": {
        "requests_served": 4182308,
        "cache_hits": 3621206,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2415010868241,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:23:21.912Z": {
        "requests_served": 4182361,
        "cache_hits": 3621257,
        "cache_misses": 558277,
        "browser_cached": 261,
        "bytes_sent": 2415016648908,
        "bytes_on_disk": 158510430969
    },
    "2020-07-05T23:23:36.908Z": {
        "requests_served": 4182402,
        "cache_hits": 3621298,
        "cache_misses": 558279,
        "browser_cached": 261,
        "bytes_sent": 2415034698166,
        "bytes_on_disk": 158511388972
    },
    "2020-07-05T23:23:51.908Z": {
        "requests_served": 4182454,
        "cache_hits": 3621340,
        "cache_misses": 558289,
        "browser_cached": 261,
        "bytes_sent": 2415069326087,
        "bytes_on_disk": 158515039661
    },
    "2020-07-05T23:24:06.910Z": {
        "requests_served": 4182474,
        "cache_hits": 3621348,
        "cache_misses": 558300,
        "browser_cached": 261,
        "bytes_sent": 2415078489863,
        "bytes_on_disk": 158518810100
    },
    "2020-07-05T23:24:21.908Z": {
        "requests_served": 4182492,
        "cache_hits": 3621359,
        "cache_misses": 558308,
        "browser_cached": 261,
        "bytes_sent": 2415086859333,
        "bytes_on_disk": 158522870354
    },
    "2020-07-05T23:24:36.992Z": {
        "requests_served": 4182521,
        "cache_hits": 3621380,
        "cache_misses": 558316,
        "browser_cached": 261,
        "bytes_sent": 2415094418185,
        "bytes_on_disk": 158526296451
    },
    "2020-07-05T23:24:51.908Z": {
        "requests_served": 4182572,
        "cache_hits": 3621430,
        "cache_misses": 558317,
        "browser_cached": 261,
        "bytes_sent": 2415117773921,
        "bytes_on_disk": 158527185248
    },
    "2020-07-05T23:25:06.908Z": {
        "requests_served": 4182606,
        "cache_hits": 3621464,
        "cache_misses": 558317,
        "browser_cached": 261,
        "bytes_sent": 2415128076329,
        "bytes_on_disk": 158527185248
    },
    "2020-07-05T23:25:21.954Z": {
        "requests_served": 4182618,
        "cache_hits": 3621475,
        "cache_misses": 558317,
        "browser_cached": 261,
        "bytes_sent": 2415142223019,
        "bytes_on_disk": 158527185248
    },
    "2020-07-05T23:25:36.908Z": {
        "requests_served": 4182622,
        "cache_hits": 3621480,
        "cache_misses": 558317,
        "browser_cached": 261,
        "bytes_sent": 2415149626398,
        "bytes_on_disk": 158527185248
    },
    "2020-07-05T23:25:51.908Z": {
        "requests_served": 4182623,
        "cache_hits": 3621481,
        "cache_misses": 558317,
        "browser_cached": 261,
        "bytes_sent": 2415151439420,
        "bytes_on_disk": 158527185248
    },
    "2020-07-05T23:26:06.908Z": {
        "requests_served": 4182637,
        "cache_hits": 3621494,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415164959109,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:26:21.908Z": {
        "requests_served": 4182655,
        "cache_hits": 3621512,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415181841255,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:26:36.908Z": {
        "requests_served": 4182655,
        "cache_hits": 3621512,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415181841255,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:26:51.908Z": {
        "requests_served": 4182695,
        "cache_hits": 3621552,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415212904966,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:27:06.908Z": {
        "requests_served": 4182739,
        "cache_hits": 3621596,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415227199577,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:27:22.056Z": {
        "requests_served": 4182785,
        "cache_hits": 3621641,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415245463937,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:27:36.908Z": {
        "requests_served": 4182819,
        "cache_hits": 3621676,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415272096301,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:27:51.908Z": {
        "requests_served": 4182828,
        "cache_hits": 3621685,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415275845763,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:28:06.921Z": {
        "requests_served": 4182853,
        "cache_hits": 3621709,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415281416384,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:28:21.908Z": {
        "requests_served": 4182888,
        "cache_hits": 3621745,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415296896896,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:28:36.908Z": {
        "requests_served": 4182918,
        "cache_hits": 3621775,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415316746465,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:28:51.908Z": {
        "requests_served": 4182960,
        "cache_hits": 3621817,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415339919164,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:29:06.908Z": {
        "requests_served": 4182993,
        "cache_hits": 3621850,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415347547101,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:29:21.920Z": {
        "requests_served": 4183029,
        "cache_hits": 3621885,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415360360193,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:29:36.913Z": {
        "requests_served": 4183077,
        "cache_hits": 3621933,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415391815604,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:29:51.908Z": {
        "requests_served": 4183083,
        "cache_hits": 3621940,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415396640084,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:30:06.908Z": {
        "requests_served": 4183098,
        "cache_hits": 3621955,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415400990759,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:30:21.908Z": {
        "requests_served": 4183119,
        "cache_hits": 3621976,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415410268251,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:30:36.908Z": {
        "requests_served": 4183139,
        "cache_hits": 3621996,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415419787712,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:30:51.908Z": {
        "requests_served": 4183158,
        "cache_hits": 3622015,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415422728656,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:31:06.908Z": {
        "requests_served": 4183185,
        "cache_hits": 3622042,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415441911527,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:31:21.908Z": {
        "requests_served": 4183202,
        "cache_hits": 3622059,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415480285152,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:31:36.908Z": {
        "requests_served": 4183224,
        "cache_hits": 3622081,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415517661467,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:31:51.908Z": {
        "requests_served": 4183235,
        "cache_hits": 3622092,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415527471161,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:32:06.908Z": {
        "requests_served": 4183264,
        "cache_hits": 3622121,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415572969299,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:32:21.908Z": {
        "requests_served": 4183297,
        "cache_hits": 3622154,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415604344246,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:32:37.032Z": {
        "requests_served": 4183342,
        "cache_hits": 3622198,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415647825598,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:32:51.908Z": {
        "requests_served": 4183371,
        "cache_hits": 3622228,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415699076776,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:33:06.908Z": {
        "requests_served": 4183422,
        "cache_hits": 3622279,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415739574066,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:33:21.908Z": {
        "requests_served": 4183493,
        "cache_hits": 3622350,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415774766876,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:33:36.908Z": {
        "requests_served": 4183526,
        "cache_hits": 3622383,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415803170733,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:33:51.908Z": {
        "requests_served": 4183563,
        "cache_hits": 3622420,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415862198034,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:34:06.908Z": {
        "requests_served": 4183605,
        "cache_hits": 3622462,
        "cache_misses": 558318,
        "browser_cached": 261,
        "bytes_sent": 2415903639229,
        "bytes_on_disk": 158527600351
    },
    "2020-07-05T23:34:21.911Z": {
        "requests_served": 4183648,
        "cache_hits": 3622487,
        "cache_misses": 558335,
        "browser_cached": 261,
        "bytes_sent": 2415917137377,
        "bytes_on_disk": 158529861203
    },
    "2020-07-05T23:34:36.908Z": {
        "requests_served": 4183693,
        "cache_hits": 3622516,
        "cache_misses": 558352,
        "browser_cached": 261,
        "bytes_sent": 2415936732848,
        "bytes_on_disk": 158532078153
    },
    "2020-07-05T23:34:51.908Z": {
        "requests_served": 4183693,
        "cache_hits": 3622516,
        "cache_misses": 558352,
        "browser_cached": 261,
        "bytes_sent": 2415936732848,
        "bytes_on_disk": 158532078153
    },
    "2020-07-05T23:35:06.908Z": {
        "requests_served": 4183711,
        "cache_hits": 3622534,
        "cache_misses": 558352,
        "browser_cached": 261,
        "bytes_sent": 2415959194546,
        "bytes_on_disk": 158532078153
    },
    "2020-07-05T23:35:21.908Z": {
        "requests_served": 4183754,
        "cache_hits": 3622577,
        "cache_misses": 558352,
        "browser_cached": 261,
        "bytes_sent": 2415992427636,
        "bytes_on_disk": 158532078153
    },
    "2020-07-05T23:35:36.908Z": {
        "requests_served": 4183794,
        "cache_hits": 3622617,
        "cache_misses": 558352,
        "browser_cached": 261,
        "bytes_sent": 2416003613164,
        "bytes_on_disk": 158532078153
    },
    "2020-07-05T23:35:51.908Z": {
        "requests_served": 4183835,
        "cache_hits": 3622658,
        "cache_misses": 558352,
        "browser_cached": 261,
        "bytes_sent": 2416031646174,
        "bytes_on_disk": 158532078153
    },
    "2020-07-05T23:36:06.908Z": {
        "requests_served": 4183887,
        "cache_hits": 3622696,
        "cache_misses": 558366,
        "browser_cached": 261,
        "bytes_sent": 2416054065069,
        "bytes_on_disk": 158533834912
    },
    "2020-07-05T23:36:21.908Z": {
        "requests_served": 4183908,
        "cache_hits": 3622716,
        "cache_misses": 558367,
        "browser_cached": 261,
        "bytes_sent": 2416058314895,
        "bytes_on_disk": 158534162622
    },
    "2020-07-05T23:36:36.908Z": {
        "requests_served": 4183924,
        "cache_hits": 3622732,
        "cache_misses": 558367,
        "browser_cached": 261,
        "bytes_sent": 2416078459200,
        "bytes_on_disk": 158534162622
    },
    "2020-07-05T23:36:51.908Z": {
        "requests_served": 4183941,
        "cache_hits": 3622749,
        "cache_misses": 558367,
        "browser_cached": 261,
        "bytes_sent": 2416099012697,
        "bytes_on_disk": 158534162622
    },
    "2020-07-05T23:37:07.315Z": {
        "requests_served": 4183978,
        "cache_hits": 3622786,
        "cache_misses": 558367,
        "browser_cached": 261,
        "bytes_sent": 2416150121728,
        "bytes_on_disk": 158534162622
    },
    "2020-07-05T23:37:21.908Z": {
        "requests_served": 4184032,
        "cache_hits": 3622837,
        "cache_misses": 558369,
        "browser_cached": 261,
        "bytes_sent": 2416175500948,
        "bytes_on_disk": 158534663997
    },
    "2020-07-05T23:37:36.920Z": {
        "requests_served": 4184068,
        "cache_hits": 3622868,
        "cache_misses": 558374,
        "browser_cached": 261,
        "bytes_sent": 2416182572404,
        "bytes_on_disk": 158536628548
    },
    "2020-07-05T23:37:51.908Z": {
        "requests_served": 4184108,
        "cache_hits": 3622902,
        "cache_misses": 558381,
        "browser_cached": 261,
        "bytes_sent": 2416191338108,
        "bytes_on_disk": 158539316633
    },
    "2020-07-05T23:38:06.908Z": {
        "requests_served": 4184122,
        "cache_hits": 3622916,
        "cache_misses": 558381,
        "browser_cached": 261,
        "bytes_sent": 2416208621290,
        "bytes_on_disk": 158539316633
    },
    "2020-07-05T23:38:21.908Z": {
        "requests_served": 4184138,
        "cache_hits": 3622932,
        "cache_misses": 558381,
        "browser_cached": 261,
        "bytes_sent": 2416216406040,
        "bytes_on_disk": 158539316633
    },
    "2020-07-05T23:38:36.908Z": {
        "requests_served": 4184184,
        "cache_hits": 3622964,
        "cache_misses": 558395,
        "browser_cached": 261,
        "bytes_sent": 2416227180660,
        "bytes_on_disk": 158546581527
    },
    "2020-07-05T23:38:51.938Z": {
        "requests_served": 4184211,
        "cache_hits": 3622986,
        "cache_misses": 558399,
        "browser_cached": 261,
        "bytes_sent": 2416236309980,
        "bytes_on_disk": 158547933440
    },
    "2020-07-05T23:39:06.908Z": {
        "requests_served": 4184232,
        "cache_hits": 3623008,
        "cache_misses": 558399,
        "browser_cached": 261,
        "bytes_sent": 2416241142066,
        "bytes_on_disk": 158547933440
    },
    "2020-07-05T23:39:22.004Z": {
        "requests_served": 4184309,
        "cache_hits": 3623084,
        "cache_misses": 558399,
        "browser_cached": 261,
        "bytes_sent": 2416267666483,
        "bytes_on_disk": 158547933440
    },
    "2020-07-05T23:39:36.908Z": {
        "requests_served": 4184392,
        "cache_hits": 3623168,
        "cache_misses": 558399,
        "browser_cached": 261,
        "bytes_sent": 2416286682766,
        "bytes_on_disk": 158547933440
    },
    "2020-07-05T23:39:51.908Z": {
        "requests_served": 4184445,
        "cache_hits": 3623221,
        "cache_misses": 558399,
        "browser_cached": 261,
        "bytes_sent": 2416305661271,
        "bytes_on_disk": 158547933440
    },
    "2020-07-05T23:40:07.530Z": {
        "requests_served": 4184479,
        "cache_hits": 3623238,
        "cache_misses": 558415,
        "browser_cached": 261,
        "bytes_sent": 2416313715580,
        "bytes_on_disk": 158550442362
    },
    "2020-07-05T23:40:22.371Z": {
        "requests_served": 4184483,
        "cache_hits": 3623240,
        "cache_misses": 558417,
        "browser_cached": 261,
        "bytes_sent": 2416314833474,
        "bytes_on_disk": 158550788190
    },
    "2020-07-05T23:40:36.908Z": {
        "requests_served": 4184509,
        "cache_hits": 3623263,
        "cache_misses": 558421,
        "browser_cached": 261,
        "bytes_sent": 2416333620630,
        "bytes_on_disk": 158553156627
    },
    "2020-07-05T23:40:51.908Z": {
        "requests_served": 4184554,
        "cache_hits": 3623302,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416345644718,
        "bytes_on_disk": 158558826676
    },
    "2020-07-05T23:41:06.908Z": {
        "requests_served": 4184610,
        "cache_hits": 3623358,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416396097580,
        "bytes_on_disk": 158558826676
    },
    "2020-07-05T23:41:21.908Z": {
        "requests_served": 4184666,
        "cache_hits": 3623414,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416449764585,
        "bytes_on_disk": 158558826676
    },
    "2020-07-05T23:41:36.922Z": {
        "requests_served": 4184697,
        "cache_hits": 3623444,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416490327906,
        "bytes_on_disk": 158558826676
    },
    "2020-07-05T23:41:51.908Z": {
        "requests_served": 4184733,
        "cache_hits": 3623481,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416511401001,
        "bytes_on_disk": 158558826676
    },
    "2020-07-05T23:42:06.908Z": {
        "requests_served": 4184806,
        "cache_hits": 3623554,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416534704387,
        "bytes_on_disk": 158558826676
    },
    "2020-07-05T23:42:21.908Z": {
        "requests_served": 4184859,
        "cache_hits": 3623607,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416549174243,
        "bytes_on_disk": 158558826676
    },
    "2020-07-05T23:42:36.908Z": {
        "requests_served": 4184885,
        "cache_hits": 3623632,
        "cache_misses": 558427,
        "browser_cached": 261,
        "bytes_sent": 2416554535464,
        "bytes_on_disk": 158558826676
    }
}

export const addData = () => {
    let inst = {
        cache_hits: Math.floor(Math.random() * 100),
        cache_misses: Math.floor(Math.random() * 100),
        browser_cached: Math.floor(Math.random() * 100),
        bytes_sent: Math.floor(Math.random() * 100),
        requests_served: Math.floor(Math.random() * 100),
        bytes_on_disk: Math.floor(Math.random() * 100),
    }
    let ti = new Date().toISOString()
    let statobj = '{"' + ti + '" :' + JSON.stringify(inst) + '}'
    store.commit('pushStats', JSON.parse(statobj));
    localStorage.stats = JSON.stringify(store.getters.data.stats);
    store.commit('updateDatasets', statobj)
}


