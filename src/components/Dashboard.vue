<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                     class="pt-0 pb-0">
            <v-row>
                <v-col>
                    <h1 class="pl-1">Dashboard</h1>
                </v-col>
                <v-col>
                    <v-btn
                            v-if="!$vuetify.breakpoint.mdAndDown"
                            :style="{color: $store.getters.current.textColor}"
                            style="position: absolute; right: 0;margin-right: 28px; margin-top: 5px"
                            :color="$store.getters.current.accent1"
                            tile
                            @click="showModal"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        Add Graph
                    </v-btn>
                    <v-btn
                            v-if="$vuetify.breakpoint.mdAndDown"
                            :style="{color: $store.getters.current.textColor}"
                            style="position: absolute; right: 0;margin-right: 28px; margin-top: 5px"
                            :color="$store.getters.current.accent1"
                            tile
                            @click="showModal"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <grid-layout
                v-if="$store.getters.loaded"
                style="width: calc(100% + 24px); left: -12px"
                :layout.sync="layout"
                :col-num="12"
                :row-height="30"
                :margin="[12,12]"
                :is-draggable="true"
                :is-resizable="true"
                :vertical-compact="true"
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
                <v-container fluid style="height: 100%;width: 100%; position: absolute" class="no-drag" >
                    <chart style="height: 100%;width: 100%" autoresize
                           :options="item.o"
                    />
                </v-container>
                <v-icon :style="{position: 'absolute', color: $store.getters.current.accent, left: 'calc(50% - 5px)', width: '10px'}"
                        dense small
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
        <modal name="createGraph"
               :styles="{backgroundColor: $store.getters.current.secondary, minHeight: '75%'}"
               width="75%"
               height="auto"
               :scrollable="true"
        >
            <v-container fluid>
                <h3>Create Graph</h3>
                <div style="width: 100%; height: 1px;" :style="{backgroundColor: $store.getters.current.accent2}"
                     class="mt-2 mb-2"/>
                <v-row>
                    <v-col cols="5">
                        <v-row style="height: 50px">
                            <v-col cols="2" class="pa-0">
                                <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-4 pl-4">
                                    Title
                                </v-subheader>
                            </v-col>
                            <v-col cols="10" class="pa-0">
                                <v-text-field
                                        v-model="$store.getters.layout.tempoptions.title.text"
                                        :dark="$store.getters.current.isDark"
                                />
                            </v-col>
                        </v-row>
                        <v-row style="height: 50px">
                            <v-col cols="2" class="pa-0">
                                <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-4 pl-4">
                                    Type
                                </v-subheader>
                            </v-col>
                            <v-col cols="10" class="pt-4 pl-0">
                                <v-btn-toggle
                                        mandatory
                                        tile
                                        :dark="$store.getters.current.isDark"
                                >
                                    <v-btn v-model="graph"
                                           :style="{color: $store.getters.current.textColor}"
                                           :color="$store.getters.current.accent1"
                                           small>
                                        Graph
                                    </v-btn>
                                    <v-btn :style="{color: $store.getters.current.textColor}"
                                           :color="$store.getters.current.accent1"
                                           small>
                                        Pie
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                        <div :hidden="!graph" v-for="(line, index) in $store.getters.layout.tempoptions.series"
                             :key="index">
                            <v-row>
                                <v-col cols="3" class="pt-5">
                                    <v-btn
                                            small
                                            icon
                                            :style="{color: $store.getters.current.textColor}"
                                            :color="$store.getters.current.accent1"
                                            @click="addSet(index)"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                    <v-btn
                                            class="ml-2"
                                            small
                                            icon
                                            v-if="$store.getters.layout.tempoptions.series.length > 1"
                                            :style="{color: $store.getters.current.textColor}"
                                            :color="$store.getters.current.accent1"
                                            @click="removeSet(index)"
                                    >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="8" class="pa-0">
                                    <v-row style="height: 50px">
                                        <v-col cols="4" class="pa-0">
                                            <v-subheader :style="{color: $store.getters.current.textColor}"
                                                         class="pt-4 pl-0">
                                                Name
                                            </v-subheader>
                                        </v-col>
                                        <v-col cols="8" class="pa-0">
                                            <v-text-field
                                                    v-model="line.name"
                                                    :dark="$store.getters.current.isDark"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 50px">
                                        <v-col cols="4" class="pa-0">
                                            <v-subheader :style="{color: $store.getters.current.textColor}"
                                                         class="pt-4 pl-0">
                                                Type
                                            </v-subheader>
                                        </v-col>
                                        <v-col cols="8" class="pa-0">
                                            <v-select
                                                    v-model="line.type"
                                                    :items="graphTypes"
                                                    item-value="val"
                                                    item-text="name"
                                                    :dark="$store.getters.current.isDark"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 50px">
                                        <v-col cols="4" class="pa-0">
                                            <v-subheader :style="{color: $store.getters.current.textColor}"
                                                         class="pt-4 pl-0">
                                                Dataset
                                            </v-subheader>
                                        </v-col>
                                        <v-col cols="8" class="pa-0">
                                            <v-select
                                                    v-model="line.data"
                                                    :items="trackabledata"
                                                    item-value="data"
                                                    item-text="name"
                                                    :dark="$store.getters.current.isDark"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </div>
                        <div :hidden="graph" v-for="(line, index) in $store.getters.layout.temppieoptions.data"
                             :key="index">
                        </div>
                    </v-col>
                    <v-col cols="7">
                        <!--                        <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-4 pl-4">Preview-->
                        <!--                        </v-subheader>-->
                        <v-chart
                                autoresize
                                style="width: 90%; left: 5%"
                                :options="$store.getters.layout.tempoptions"
                        />
                    </v-col>
                </v-row>
                <v-btn absolute tile
                       :style="{color: $store.getters.current.textColor, right: '12px', bottom: '12px'}"
                       :color="$store.getters.current.accent1">
                    Add Graph
                </v-btn>
            </v-container>
        </modal>
        <v-btn @click="this.updateData">
            Add data
        </v-btn>
    </v-container>
</template>

<script>
    import store from '../store/index';
    // import moment from "moment";

    export default {
        name: 'Dashboard',
        components: {chart: () => import('vue-echarts')},
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
                axisPointer: {
                    type: 'cross',
                    label: {
                        color: store.getters.current.secondary,
                        formatter: (point) => {
                            if (point.axisDimension === 'x' && point.seriesData[0] && point.seriesData[0] && point.seriesData[0].data) {
                                let date = new Date(point.seriesData[0].data[0]);
                                return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                            }
                            return this.byteFormat(point.value)
                        }
                    },
                }
            };
            let grid = {
                right: 40,
                left: 40,
                bottom: 40,
                top: 60,
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
                },
                // axisLabel: {
                //     formatter: (value) => {
                //         return moment.utc(value).format('MMM D, h:mm:ss a')
                //     }
                // },
                // value: store.getters.data.date
            };
            let yAxis = [{
                type: 'value',
                name: 'Total',
                scale: true,
                max: function (value) {
                    return (value.max).toFixed(5).replace(/\.?0*$/, '');
                },
                min: function (value) {
                    return (value.min).toFixed(5).replace(/\.?0*$/, '');
                },
                axisLabel: {
                    formatter: this.byteFormat
                },
                axisLine: {
                    lineStyle: {
                        color: store.getters.current.textColor
                    }
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                position: 'right',
                name: 'Change',
                scale: true,
                max: function (value) {
                    return (value.max).toFixed(5).replace(/\.?0*$/, '');
                },
                min: function (value) {
                    return (value.min).toFixed(5).replace(/\.?0*$/, '');
                },
                axisLabel: {
                    formatter: this.byteFormat
                },
                axisLine: {
                    lineStyle: {
                        color: store.getters.current.textColor
                    }
                },
                splitLine: {
                    show: false
                },
            }];
            let dataZoom = [{
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
                graph: true,
                graphoptstemplate: {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    toolbox: {
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
                    },
                    dataZoom: [{
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
                    }],
                    grid: {
                        right: 40,
                        left: 40,
                        bottom: 40,
                        top: 40,
                        containLabel: true,
                    },
                    legend: {
                        left: 'center',
                        top: 22,
                        data: ['Total', 'Change'],
                        inactiveColor: store.getters.current.accent2,
                        textStyle: {
                            color: store.getters.current.textColor
                        }
                    },
                    xAxis: {
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
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            // formatter: this.byteFormat
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
                    title: {
                        left: 'center',
                        text: 'Title',
                        textStyle: {
                            color: store.getters.current.textColor
                        }
                    },
                    series: []
                },
                trackabledata: [
                    {name: 'Hits', data: store.getters.data.hits},
                    {name: 'Misses', data: store.getters.data.misses},
                    {name: 'BrowserCached', data: store.getters.data.cached},
                    {name: 'Requests Served', data: store.getters.data.reqServ},
                    {name: 'Bytes Sent', data: store.getters.data.bytesSent},
                    {name: 'Bytes On Disk', data: store.getters.data.sizeDisk},
                    // {name: 'Change in Hits', data: store.getters.data.hits},
                    // {name: 'Change in Misses', data: store.getters.data.misses},
                    // {name: 'Change in BrowserCached', data: store.getters.data.cached},
                    {name: 'Change in Requests Served', data: store.getters.data.reqServChange},
                    {name: 'Change in Bytes Sent', data: store.getters.data.bytesSentChange},
                    {name: 'Change in Bytes On Disk', data: store.getters.data.sizeDiskChange},
                ],
                datasets: [],
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
                                            value: store.getters.data.hits[store.getters.data.hits.length - 1] ? store.getters.data.hits[store.getters.data.hits.length - 1][1] : 0,
                                            name: 'Hits',
                                            itemStyle: {color: store.getters.current.green}
                                        },
                                        {
                                            value: store.getters.data.misses[store.getters.data.misses.length - 1] ? store.getters.data.misses[store.getters.data.misses.length - 1][1] : 0,
                                            name: 'Misses',
                                            itemStyle: {color: store.getters.current.red}
                                        },
                                        {
                                            value: store.getters.data.cached[store.getters.data.cached.length - 1] ? store.getters.data.cached[store.getters.data.cached.length - 1][1] : 0,
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
                                yAxisIndex: 1,
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
                            tooltip: tooltip,
                            toolbox: tbox,
                            grid: grid,
                            legend: legend,
                            xAxis: xAxis,
                            dataZoom: dataZoom,
                            title: {
                                left: 'center',
                                text: 'Requests Served',
                                textStyle: {
                                    color: store.getters.current.textColor
                                }
                            },
                            yAxis: [{
                                name: 'Total',
                                type: 'value',
                                scale: true,
                                max: function (value) {
                                    return (value.max - 100).toFixed(5).replace(/\.?0*$/, '');
                                },
                                min: function (value) {
                                    return (value.min - 100).toFixed(5).replace(/\.?0*$/, '');
                                },
                                axisLabel: {
                                    formatter: this.unitFormat
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: xAxis.axisLine.lineStyle.color
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: xAxis.splitLine.lineStyle.color
                                    }
                                }
                            }, {
                                type: 'value',
                                position: 'right',
                                name: 'Change',
                                scale: true,
                                max: function (value) {
                                    return (value.max).toFixed(5).replace(/\.?0*$/, '');
                                },
                                min: function (value) {
                                    return (value.min).toFixed(5).replace(/\.?0*$/, '');
                                },
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
                                },
                            }],
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
                                yAxisIndex: 1,
                                type: 'bar',
                                itemStyle: {
                                    color: store.getters.current.yellow
                                },
                            }],
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
                                yAxisIndex: 1,
                                type: 'bar',
                                itemStyle: {
                                    color: store.getters.current.yellow
                                },
                            }],
                            dataZoom: dataZoom,
                        }
                    }
                ],
                graphTypes: [{name: 'Line', val: 'line'}, {name: 'Bar', val: 'bar'}],
            }
        },
        methods: {
            layoutRemove(index) {
                for (let i = 0; i < this.layout.length; i++) {
                    if (this.layout[i].i === index) {
                        this.layout.splice(i, 1)
                    }
                }
            },
            showModal() {
                this.uniqindex = 0;
                this.datasets = [{
                    name: 'name',
                    type: 'line',
                    data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10 + 11), Math.floor(Math.random() * 10 + 22), Math.floor(Math.random() * 10 + 33)]
                }]
                store.commit('setTempOptions', this.graphoptstemplate)
                store.commit('setTempDatasets', this.datasets)
                this.$modal.show('createGraph')
            },
            addSet(index) {
                this.datasets.splice(index + 1, 0, {
                    name: 'item ' + (this.uniqindex++),
                    type: 'line',
                    data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10 + 11), Math.floor(Math.random() * 10 + 22), Math.floor(Math.random() * 10 + 33)]
                })
                store.commit('setTempDatasets', this.datasets)
            },
            removeSet(index) {
                store.getters.layout.tempoptions.series.splice(index, 1, {
                    name: this.datasets[index].name,
                    data: []
                })
                this.$nextTick(() => {
                    store.getters.layout.tempoptions.series.splice(index, 1)
                    store.commit('setTempDatasets', this.datasets)
                })

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
            layouts() {
                return this.layout;
            },
            hitmiscach(){
                return store.getters.data.date
            }
        },
        watch: {
            layouts() {
                console.log(this.layout)
            },
            hitmiscach(){
                this.layout[0].o.series[0].data[0].value = store.getters.data.hits[store.getters.data.hits.length - 1][1];
                this.layout[0].o.series[0].data[1].value = store.getters.data.misses[store.getters.data.misses.length - 1][1];
                this.layout[0].o.series[0].data[2].value = store.getters.data.cached[store.getters.data.cached.length - 1][1];
            }
        }
    }
</script>

<style>
    .vue-resizable-handle {
        background-image: none !important;
    }
</style>
