<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                     class="pt-0 pb-0">
            <v-row>
                <v-col>
                    <h1 class="pl-1">Dashboard</h1>
                </v-col>
                <v-spacer/>
                <v-spacer/>
                <v-spacer/>
                <v-spacer/>
                <v-spacer/>
                <v-spacer/>
                <v-spacer/>
                <v-spacer/>
                <v-spacer/>
                <v-spacer v-if="!$vuetify.breakpoint.mdAndDown"/>
                <!--                <v-col>-->
                <!--                    <v-btn-->
                <!--                            class="mt-1"-->
                <!--                            @click="pull"-->
                <!--                            :style="{color: $store.getters.current.textColor}"-->
                <!--                            :color="$store.getters.current.accent1">-->
                <!--                        Refresh-->
                <!--                    </v-btn>-->
                <!--                </v-col>-->
                <v-col>
                    <v-btn
                            class="mt-1"
                            v-if="!$vuetify.breakpoint.mdAndDown"
                            :style="{color: $store.getters.current.textColor}"
                            :color="$store.getters.current.accent1"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        Add Graph
                    </v-btn>
                    <v-btn
                            class="mt-2 pa-0"
                            v-if="$vuetify.breakpoint.mdAndDown"
                            :style="{color: $store.getters.current.textColor}"
                            :color="$store.getters.current.accent1"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <grid-layout
                :layout.sync="layout"
                :col-num="12"
                :row-height="30"
                :is-draggable="true"
                :is-resizable="true"
                :vertical-compact="true"
                :margin="[10, 10]"
                :hidden="$vuetify.breakpoint.smAndDown"

        >
            <grid-item v-for="item in layout"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       :key="item.i"
                       :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha, color: $store.getters.current.accent}"
                       drag-allow-from=".vue-draggable-handle"
                       drag-ignore-from=".no-drag"
                       @move="moved"
                       @resize="resized"
            >
                <v-container style="height: 100%;width: 100%; position: absolute" class="no-drag">
                    <v-chart style="height: 100%;width: 100%" autoresize
                             :options="item.o"
                    />
                </v-container>
                <v-icon :style="{position: 'absolute', color: $store.getters.current.accent, left: 'calc(50% - 5px)', width: '10px'}" dense small
                        class="vue-draggable-handle">mdi-drag-horizontal-variant
                </v-icon>
                <v-icon :style="{position: 'absolute', color: $store.getters.current.accent, bottom: '2px', right: '2px'}"
                        dense small
                >mdi-resize-bottom-right
                </v-icon>
                <v-icon :style="{position: 'absolute', color: $store.getters.current.accent, top: '2px', right: '2px'}"
                        dense small
                        @click="layoutRemove(item.i)"
                >mdi-close
                </v-icon>
            </grid-item>
        </grid-layout>
        <v-row v-if="$vuetify.breakpoint.smAndDown">
            <v-col cols="12">
                <v-container fluid style="height: 300px;width: 100%" class="vue-draggable-handle"
                             :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
                    <v-chart style="height: 100%;width: 100%" autoresize class="no-drag"
                             :options="layout[0].o"/>
                </v-container>
            </v-col>
            <v-col cols="12">
                <v-container fluid style="height: 300px;width: 100%" class="vue-draggable-handle"
                             :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
                    <v-chart style="height: 100%;width: 100%" autoresize class="no-drag"
                             :options="layout[1].o"/>
                </v-container>
            </v-col>
            <v-col cols="12">
                <v-container fluid style="height: 300px;width: 100%" class="vue-draggable-handle"
                             :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
                    <v-chart style="height: 100%;width: 100%" autoresize class="no-drag"
                             :options="layout[2].o"/>
                </v-container>
            </v-col>
            <v-col cols="12">
                <v-container fluid style="height: 300px;width: 100%" class="vue-draggable-handle"
                             :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
                    <v-chart style="height: 100%;width: 100%" autoresize class="no-drag"
                             :options="layout[3].o"/>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import store from '../store/index';

    export default {
        name: 'Dashboard',
        data() {
            let tbox = {
                orient: 'vertical',
                top: 30,
                iconStyle: {
                    color: store.getters.current.accent,
                    borderColor: '#00000000'
                },
                emphasis: {
                    iconStyle: {
                        textPosition: 'left',
                        color: store.getters.current.accent2,
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
            let tooltip = {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            };
            let grid = {
                right: 40,
                left: 40,
                bottom: 40,
                top: 40,
                containLabel: true,
            };
            let xAxis = {
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
                }
            };
            let yAxis = {
                type: 'value',
                axisLabel: {
                    formatter: this.byteFormat
                },
                axisLine: {
                    lineStyle: {
                        color: store.getters.current.textColor
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: store.getters.current.accent1
                    }
                }
            };
            let dataZoom = [{
                type: 'inside',
            }, {
                start: 90,
                end: 100,
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
            let legend = {
                left: 'center',
                top: 22,
                data: ['Total', 'Change'],
                inactiveColor: store.getters.current.accent2,
                textStyle: {
                    color: store.getters.current.textColor
                }
            };
            let layout = store.getters.layout.grid;
            return {
                layout: [
                    {
                        x: layout[0].x, y: layout[0].y, w: layout[0].w, h: layout[0].h, i: layout[0].i, o: {
                            title: {
                                left: 'center',
                                text: 'Reliability',
                                textStyle: {
                                    color: store.getters.current.textColor
                                }
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: ' {b}<br/>{c} ({d}%)'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 0,
                                data: ['Hits', 'Misses', 'Cached'],
                                inactiveColor: store.getters.current.accent2,
                                textStyle: {
                                    color: store.getters.current.textColor
                                }
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
                                            itemStyle: {color: store.getters.current.green}
                                        },
                                        {
                                            value: 0,
                                            name: 'Misses',
                                            itemStyle: {color: store.getters.current.red}
                                        },
                                        {
                                            value: 0,
                                            name: 'Cached',
                                            itemStyle: {color: store.getters.current.accent}
                                        },
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        x: layout[1].x, y: layout[1].y, w: layout[1].w, h: layout[1].h, i: layout[1].i, o: {
                            title: {
                                left: 'center',
                                text: 'Bytes Sent',
                                textStyle: {
                                    color: store.getters.current.textColor
                                }
                            },
                            tooltip: tooltip,
                            toolbox: tbox,
                            grid: grid,
                            legend: legend,
                            xAxis: xAxis,
                            yAxis: yAxis,
                            series: [{
                                name: 'Total',
                                data: store.getters.data.bytesSent,
                                type: 'line',
                                sampling: 'average',
                                showSymbol: false,
                                itemStyle: {
                                    color: store.getters.current.textColor
                                },
                            }, {
                                name: 'Change',
                                data: store.getters.data.bytesSentChange,
                                type: 'bar',
                                itemStyle: {
                                    color: store.getters.current.yellow
                                },
                            }],
                            dataZoom: dataZoom,
                        }
                    },
                    {
                        x: layout[2].x, y: layout[2].y, w: layout[2].w, h: layout[2].h, i: layout[2].i, o: {
                            title: {
                                left: 'center',
                                text: 'Requests Served',
                                textStyle: {
                                    color: store.getters.current.textColor
                                }
                            },
                            tooltip: tooltip,
                            toolbox: tbox,
                            grid: grid,
                            legend: legend,
                            xAxis: xAxis,
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    formatter: this.unitFormat
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: store.getters.current.textColor
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: store.getters.current.accent1
                                    }
                                }
                            },
                            series: [{
                                name: 'Total',
                                data: store.getters.data.reqServ,
                                type: 'line',
                                sampling: 'average',
                                showSymbol: false,
                                itemStyle: {
                                    color: store.getters.current.textColor
                                },
                            }, {
                                name: 'Change',
                                data: store.getters.data.reqServChange,
                                type: 'bar',
                                itemStyle: {
                                    color: store.getters.current.yellow
                                },
                            }],
                            dataZoom: dataZoom,
                        }
                    },
                    {
                        x: layout[3].x, y: layout[3].y, w: layout[3].w, h: layout[3].h, i: layout[3].i, o: {
                            title: {
                                left: 'center',
                                text: 'Size On Disk',
                                textStyle: {
                                    color: store.getters.current.textColor
                                }
                            },
                            tooltip: tooltip,
                            toolbox: tbox,
                            grid: grid,
                            legend: legend,
                            xAxis: xAxis,
                            yAxis: yAxis,
                            series: [{
                                name: 'Total',
                                data: store.getters.data.sizeDisk,
                                type: 'line',
                                sampling: 'average',
                                showSymbol: false,
                                itemStyle: {
                                    color: store.getters.current.textColor
                                },
                            }, {
                                name: 'Change',
                                data: store.getters.data.sizeDiskChange,
                                type: 'bar',
                                itemStyle: {
                                    color: store.getters.current.yellow
                                },
                            }],
                            dataZoom: dataZoom,
                        }
                    }
                ],
                evnt: Event
            }
        },
        methods: {
            byteFormat(value) {
                let num = parseFloat(value);
                if (num >= 1000000000000000)
                    return num / 1000000000000000 + 'pb'
                if (num >= 1000000000000)
                    return num / 1000000000000 + 'tb'
                if (num >= 1000000000)
                    return num / 1000000000 + 'gb'
                if (num >= 1000000)
                    return num / 1000000 + 'mb'
                if (num >= 1000)
                    return num / 1000 + 'kb'
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
            layoutRemove(index){
                for(let i = 0; i < this.layout.length; i++){
                    if (this.layout[i].i === index){
                        this.layout.splice(i, 1)
                    }
                }
            },
            updateValues() {
                let stats = store.getters.data.stats;
                if (stats.length < 1)
                    return;
                let key = Object.keys(stats[stats.length - 1])[0]
                let inst = stats[stats.length - 1][key];
                let hist = stats.length > 2 ? stats[stats.length - 2][Object.keys(stats[stats.length - 2])[0]] : null;
                let time = new Date(key.replace('T', ' ').replace('Z', ' '));
                this.layout[0].o.series[0].data[0].value = inst.cache_hits;
                this.layout[0].o.series[0].data[1].value = inst.cache_misses;
                this.layout[0].o.series[0].data[2].value = inst.browser_cached;
                store.commit('pushHits', inst.cache_hits);
                store.commit('pushMisses', inst.cache_misses);
                store.commit('pushCached', inst.browser_cached);
                store.commit('pushDate', time);
                store.commit('pushBytesSent', [time, inst.bytes_sent]);
                store.commit('pushBytesSentChange', [time, hist ? inst.bytes_sent - hist.bytes_sent : 0]);
                store.commit('pushReqServ', [time, inst.requests_served]);
                store.commit('pushReqServChange', [time, hist ? inst.requests_served - hist.requests_served : 0]);
                store.commit('pushSizeDisk', [time, inst.bytes_on_disk]);
                store.commit('pushSizeDiskChange', [time, hist ? inst.bytes_on_disk - hist.bytes_on_disk : 0]);
            },
            pull() {
                fetch("api/stats")
                    .then(response => response.json())
                    .then(response => {
                        store.commit('pushStats', response);
                        localStorage.stats = JSON.stringify(store.getters.data.stats);
                    }).catch((err) => {
                    console.log(err);
                });
                // let date = new Date();
                // let response = "{\"" + date.toISOString() + "\": {\"requests_served\": " +
                //     Math.floor(Math.random() * 10) + ",\"cache_hits\": " +
                //     Math.floor(Math.random() * 10) + ",\"cache_misses\": " +
                //     Math.floor(Math.random() * 10) + ",\"browser_cached\": " +
                //     Math.floor(Math.random() * 10) + ",\"bytes_sent\": " +
                //     Math.floor(Math.random() * 100) + ",\"bytes_on_disk\":" +
                //     Math.floor(Math.random() * 100) + "}}"
                // let par = JSON.parse(response);
                // store.commit('pushStats', par);
                // localStorage.stats = JSON.stringify(store.getters.data.stats);
                // console.log(date.toISOString())

            },
            moved(i, newX, newY) {
                store.commit('setSpecificLayout', {i: i, x: newX, y: newY})
                localStorage.layout = JSON.stringify(store.getters.layout.grid)
            },
            resized(i, newH, newW) {
                store.commit('setSpecificLayout', {i: i, w: newW, h: newH})
                localStorage.layout = JSON.stringify(store.getters.layout.grid)
            }
        },
        computed: {
            stats() {
                return store.getters.data.stats
            },
        },
        watch: {
            stats() {
                this.updateValues()
            },
        }
    }
</script>

<style>
    .vue-resizable-handle {
        background-image: none !important;
    }
</style>
