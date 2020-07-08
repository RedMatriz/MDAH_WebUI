import store from "@/store";
import moment from "moment";

export const dataUnits = ['YB', 'ZB', 'EB', 'PB', 'TB', 'GB', 'MB', 'KB', 'B']
export const numberUnits = ['d', 'n', 'o', 'S', 's', 'Q', 'q', 't', 'B', 'M', 'K', '']
export const formatNumber = (value, units, flot) => {
    let num = parseFloat(value);
    for (let i = 0; i < units.length; i++) {
        let div = Math.pow(10, (units.length - i - 1) * 3);
        if (num >= div)
            return float(num / div, flot) + units[i]
    }
    return float(num, flot)
}
const units = [[], dataUnits, numberUnits]

export const constructChart = (storedConfig) => {
    let temp = JSON.parse(JSON.stringify(storedConfig));
    if (storedConfig.type === 'graph') {
        temp.title.textStyle = {
            color: store.getters.current.textColor
        }
        temp.title.top = 10
        temp.toolbox = {
            orient: 'vertical',
            top: 20,
            right: 0,
            width: 5,
            iconStyle: {
                color: store.getters.current.accent,
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
                        zoom: 'M14,17H17V14H19V17H22V19H19V22H17V19H14V17M12,17V19H9V17H12M7,17V19H3V15H5V17H7M3,13V10H5V13H3M3,8V4H7V6H5V8H3M9,4H12V6H9V4M15,4H19V8H17V6H15V4M19,10V12H17V10H19Z',
                        back: 'M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z'
                    },
                    title: {
                        zoom: 'Zoom',
                        back: "Undo"
                    }
                },
                restore: {
                    title: 'Restore',
                    icon: 'M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z',
                }
            }
        }
        let offadd = 0
        temp.yAxis.forEach((x) => {
            offadd += x.offset ? x.offset : 0
        })
        temp.grid = {
            right: 30 + offadd,
            left: 30,
            bottom: 40,
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
                },
            }
        };
        temp.tooltip.axisPointer.label.formatter = (point) => {
            if (point.axisDimension === 'x' && point.seriesData[0] && point.seriesData[0].data) {
                return moment(point.seriesData[0].data[0]).format('MMM D, h:mm:ssa')
            }
            return formatNumber(point.value, units[temp.yAxis[point.axisIndex].axisLabel.unit], 4)
        }
        temp.dataZoom = [{
            type: 'inside',
        }, {
            start: 90,
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
        temp.series.forEach((x) => {
            switch (x.dataId) {
                case 'Hits':
                    x.data = store.getters.data.hits
                    break
                case 'Misses':
                    x.data = store.getters.data.misses
                    break
                case 'Browser Cached':
                    x.data = store.getters.data.cached
                    break
                case 'Requests Served':
                    x.data = store.getters.data.reqServ
                    break
                case 'Bytes Sent':
                    x.data = store.getters.data.bytesSent
                    break
                case 'Bytes On Disk':
                    x.data = store.getters.data.sizeDisk
                    break
                case 'Change in Hits':
                    x.data = store.getters.data.hitsChange
                    break
                case 'Change in Misses':
                    x.data = store.getters.data.missesChange
                    break
                case 'Change in Browser Cached':
                    x.data = store.getters.data.cachedChange
                    break
                case 'Change in Requests Served':
                    x.data = store.getters.data.reqServChange
                    break
                case 'Change in Bytes Sent':
                    x.data = store.getters.data.bytesSentChange
                    break
                case 'Change in Bytes On Disk':
                    x.data = store.getters.data.sizeDiskChange
                    break
            }
            switch (x.itemStyle.colorId) {
                case 'background':
                    x.itemStyle.color = store.getters.current.backgroundColor
                    break
                case 'text':
                    x.itemStyle.color = store.getters.current.textColor
                    break
                case 'primary':
                    x.itemStyle.color = store.getters.current.primary
                    break
                case 'secondary':
                    x.itemStyle.color = store.getters.current.secondary
                    break
                case 'accent':
                    x.itemStyle.color = store.getters.current.accent
                    break
                case 'accent1':
                    x.itemStyle.color = store.getters.current.accent1
                    break
                case 'accent2':
                    x.itemStyle.color = store.getters.current.accent2
                    break
                case 'red':
                    x.itemStyle.color = store.getters.current.red
                    break
                case 'green':
                    x.itemStyle.color = store.getters.current.green
                    break
                case 'yellow':
                    x.itemStyle.color = store.getters.current.yellow
                    break
                default:
                    break
            }
        })
        return temp
    } else if (storedConfig.type === 'pie') {
        temp.title.textStyle = {
            color: store.getters.current.textColor
        }
        temp.title.top = 10
        temp.legend.inactiveColor = store.getters.current.accent2;
        temp.legend.textStyle = {color: store.getters.current.textColor};
        temp.tooltip = {
            trigger: 'item',
            formatter: ' {b}<br/>{c} ({d}%)'
        }
        temp.series[0].data.forEach((x) => {
            switch (x.dataId) {
                case 'Hits':
                    x.value = store.getters.lastValueOf('hits')
                    break
                case 'Misses':
                    x.value = store.getters.lastValueOf('misses')
                    break
                case 'Browser Cached':
                    x.value = store.getters.lastValueOf('cached')
                    break
                case 'Requests Served':
                    x.value = store.getters.lastValueOf('reqServ')
                    break
                case 'Bytes Sent':
                    x.value = store.getters.lastValueOf('bytesSent')
                    break
                case 'Bytes On Disk':
                    x.value = store.getters.lastValueOf('sizeDisk')
                    break
                case 'Change in Hits':
                    x.value = store.getters.lastValueOf('hitsChange')
                    break
                case 'Change in Misses':
                    x.value = store.getters.lastValueOf('missesChange')
                    break
                case 'Change in Browser Cached':
                    x.value = store.getters.lastValueOf('cachedChange')
                    break
                case 'Change in Requests Served':
                    x.value = store.getters.lastValueOf('reqServChange')
                    break
                case 'Change in Bytes Sent':
                    x.value = store.getters.lastValueOf('bytesSentChange')
                    break
                case 'Change in Bytes On Disk':
                    x.value = store.getters.lastValueOf('sizeDiskChange')
                    break
            }
            switch (x.itemStyle.colorId) {
                case 'background':
                    x.itemStyle.color = store.getters.current.backgroundColor
                    break
                case 'text':
                    x.itemStyle.color = store.getters.current.textColor
                    break
                case 'primary':
                    x.itemStyle.color = store.getters.current.primary
                    break
                case 'secondary':
                    x.itemStyle.color = store.getters.current.secondary
                    break
                case 'accent':
                    x.itemStyle.color = store.getters.current.accent
                    break
                case 'accent1':
                    x.itemStyle.color = store.getters.current.accent1
                    break
                case 'accent2':
                    x.itemStyle.color = store.getters.current.accent2
                    break
                case 'red':
                    x.itemStyle.color = store.getters.current.red
                    break
                case 'green':
                    x.itemStyle.color = store.getters.current.green
                    break
                case 'yellow':
                    x.itemStyle.color = store.getters.current.yellow
                    break
                default:
                    break
            }
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

export const getCPSWOD = (prevvalue, curvalue, prevtime, curtime) => {
    return float(((curvalue - prevvalue) / (Math.abs(moment(curtime) - moment(prevtime))) * 1000), 4) // x1000 for seconds
}

export const loadData = () => {
    for (let i = 0; i < store.getters.data.stats.length; i++) {
        let key = Object.keys(store.getters.data.stats[i])[0]
        let inst = store.getters.data.stats[i][key];
        let histkey = i > 0 ? Object.keys(store.getters.data.stats[i - 1])[0] : null;
        let hist = i > 0 ? store.getters.data.stats[i - 1][histkey] : null;
        let time = new Date(moment(key));
        if (moment(histkey) - moment(key) > store.getters.data.updateInterval * 1000) {
            let lastupdatetime = moment(histkey)
            let fillpoints = Math.floor((moment(key) - moment(histkey)) / (store.getters.data.updateInterval * 1000))
            let fillhits = (inst.cache_hits - store.getters.lastValueOf('hits')) / (fillpoints)
            let fillmisses = (inst.cache_misses - store.getters.lastValueOf('misses')) / (fillpoints)
            let fillcached = (inst.browser_cached - store.getters.lastValueOf('cached')) / (fillpoints)
            let fillsent = (inst.bytes_sent - store.getters.lastValueOf('bytesSent')) / (fillpoints)
            let fillreq = (inst.requests_served - store.getters.lastValueOf('reqServ') - inst.requests_served) / (fillpoints)
            let fillsize = (inst.bytes_on_disk - store.getters.lastValueOf('sizeDisk') - inst.bytes_on_disk) / (fillpoints)
            while (moment(histkey) - lastupdatetime > store.getters.data.updateInterval * 1000) {
                lastupdatetime.add(store.getters.data.updateInterval, 's')
                let filltime = new Date(lastupdatetime)
                store.commit('pushStats', JSON.parse('{"' + filltime.toISOString() + '": ' + JSON.stringify({
                    cache_hits: -fillhits * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                    cache_misses: -fillmisses * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                    browser_cached: -fillcached * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                    bytes_sent: -fillsent * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                    requests_served: -fillreq * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                    bytes_on_disk: -fillsize * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                }) + '}'));
                store.commit('pushHits', [filltime, (-fillhits * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
                store.commit('pushHitsChange', [filltime, fillhits / 1000]);
                store.commit('pushMisses', [filltime, (-fillmisses * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
                store.commit('pushMissesChange', [filltime, fillmisses / 1000]);
                store.commit('pushCached', [filltime, (-fillcached * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
                store.commit('pushCachedChange', [filltime, fillcached / 1000]);
                store.commit('pushBytesSent', [filltime, (-fillsent * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
                store.commit('pushBytesSentChange', [filltime, fillsent / 1000]);
                store.commit('pushReqServ', [filltime, (-fillreq * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
                store.commit('pushReqServChange', [filltime, fillreq / 1000]);
                store.commit('pushSizeDisk', [filltime, (-fillsize * Math.floor((moment(key) - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
                store.commit('pushSizeDiskChange', [filltime, fillsize / 1000]);
            }
            localStorage.stats = JSON.stringify(store.getters.data.stats);
        }
        store.commit('pushDate', key)
        store.commit('pushHits', [time, inst.cache_hits]);
        store.commit('pushHitsChange', [time, hist ? getCPSWOD(hist.cache_hits, inst.cache_hits, histkey, key) : 0]);
        store.commit('pushMisses', [time, inst.cache_misses]);
        store.commit('pushMissesChange', [time, hist ? getCPSWOD(hist.cache_misses, inst.cache_misses, histkey, key) : 0]);
        store.commit('pushCached', [time, inst.browser_cached]);
        store.commit('pushCachedChange', [time, hist ? getCPSWOD(hist.browser_cached, inst.browser_cached, histkey, key) : 0]);
        store.commit('pushBytesSent', [time, inst.bytes_sent]);
        store.commit('pushBytesSentChange', [time, hist ? getCPSWOD(hist.bytes_sent, inst.bytes_sent, histkey, key) : 0]);
        store.commit('pushReqServ', [time, inst.requests_served]);
        store.commit('pushReqServChange', [time, hist ? getCPSWOD(hist.requests_served, inst.requests_served, histkey, key) : 0]);
        store.commit('pushSizeDisk', [time, inst.bytes_on_disk]);
        store.commit('pushSizeDiskChange', [time, hist ? getCPSWOD(hist.bytes_on_disk, inst.bytes_on_disk, histkey, key) : 0]);
    }
}

export const sortData = () => {
    let stats = store.getters.data.stats;
    store.commit('setStats', quickSort(stats));

    // localStorage.stats = JSON.stringify(store.getters.data.stats);

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
    let momtime = moment(ti)
    let time = new Date(momtime)
    let lastupdatetime = moment(store.getters.lastDataPairOf('date'))
    if (momtime - lastupdatetime > store.getters.data.updateInterval * 1000) {
        let fillpoints = Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000))
        let fillhits = (inst.cache_hits - store.getters.lastValueOf('hits')) / (fillpoints)
        let fillmisses = (inst.cache_misses - store.getters.lastValueOf('misses')) / (fillpoints)
        let fillcached = (inst.browser_cached - store.getters.lastValueOf('cached')) / (fillpoints)
        let fillsent = (inst.bytes_sent - store.getters.lastValueOf('bytesSent')) / (fillpoints)
        let fillreq = (inst.requests_served - store.getters.lastValueOf('reqServ') - inst.requests_served) / (fillpoints)
        let fillsize = (inst.bytes_on_disk - store.getters.lastValueOf('sizeDisk') - inst.bytes_on_disk) / (fillpoints)
        while (momtime - lastupdatetime > store.getters.data.updateInterval * 1000) {
            lastupdatetime.add(store.getters.data.updateInterval, 's')
            let filltime = new Date(lastupdatetime)
            store.commit('pushStats', JSON.parse('{"' + filltime.toISOString() + '": ' + JSON.stringify({
                cache_hits: -fillhits * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                cache_misses: -fillmisses * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                browser_cached: -fillcached * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                bytes_sent: -fillsent * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                requests_served: -fillreq * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
                bytes_on_disk: -fillsize * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000)),
            }) + '}'));
            store.commit('pushDate', filltime.toISOString())
            store.commit('pushHits', [filltime, (-fillhits * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
            store.commit('pushHitsChange', [filltime, fillhits / 1000]);
            store.commit('pushMisses', [filltime, (-fillmisses * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
            store.commit('pushMissesChange', [filltime, fillmisses / 1000]);
            store.commit('pushCached', [filltime, (-fillcached * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
            store.commit('pushCachedChange', [filltime, fillcached / 1000]);
            store.commit('pushBytesSent', [filltime, (-fillsent * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
            store.commit('pushBytesSentChange', [filltime, fillsent / 1000]);
            store.commit('pushReqServ', [filltime, (-fillreq * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
            store.commit('pushReqServChange', [filltime, fillreq / 1000]);
            store.commit('pushSizeDisk', [filltime, (-fillsize * Math.floor((momtime - lastupdatetime) / (store.getters.data.updateInterval * 1000))).toFixed(0)]);
            store.commit('pushSizeDiskChange', [filltime, fillsize / 1000]);
        }
        localStorage.stats = JSON.stringify(store.getters.data.stats);
    }
    store.commit('pushDate', time)
    store.commit('pushHitsChange', [time, getCPSWOD(store.getters.lastValueOf('hits'), inst.cache_hits, store.getters.lastDataPairOf('hits')[0], time)]);
    store.commit('pushHits', [time, inst.cache_hits]);
    store.commit('pushMissesChange', [time, getCPSWOD(store.getters.lastValueOf('misses'), inst.cache_hits, store.getters.lastDataPairOf('misses')[0], time)]);
    store.commit('pushMisses', [time, inst.cache_misses]);
    store.commit('pushCachedChange', [time, getCPSWOD(store.getters.lastValueOf('cached'), inst.cache_hits, store.getters.lastDataPairOf('cached')[0], time)]);
    store.commit('pushCached', [time, inst.browser_cached]);
    store.commit('pushBytesSentChange', [time, getCPSWOD(store.getters.lastValueOf('bytesSent'), inst.cache_hits, store.getters.lastDataPairOf('bytesSent')[0], time)]);
    store.commit('pushBytesSent', [time, inst.bytes_sent]);
    store.commit('pushReqServChange', [time, getCPSWOD(store.getters.lastValueOf('reqServ'), inst.cache_hits, store.getters.lastDataPairOf('reqServ')[0], time)]);
    store.commit('pushReqServ', [time, inst.requests_served]);
    store.commit('pushSizeDiskChange', [time, getCPSWOD(store.getters.lastValueOf('sizeDisk'), inst.cache_hits, store.getters.lastDataPairOf('sizeDisk')[0], time)]);
    store.commit('pushSizeDisk', [time, inst.bytes_on_disk]);
}

export const getCPS = (dataset, now, nowset) => {
    return store.getters.lastDataPairOf(dataset) ?
        (nowset.cache_hits - store.getters.lastDataPairOf(dataset)[1]) /
        (moment(now) - moment(store.getters.lastDataPairOf(dataset)[0])) * 1000
        : 0
}

export const float = (number, x) => {
    return number.toFixed(x ? x : 2).replace(/\.?0*$/, '')
}



