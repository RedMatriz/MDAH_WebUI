<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}" class="pa-5">
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                     class="mb-3">
            <h1>Dashboard</h1>
        </v-container>
        <v-row>
            <v-col cols="12" md="4">
                <graph graph-id="hitmiss"
                       height="300"
                       md-up-height="300"
                       type="doughnut"
                       :data="{
                                labels: ['Hits', 'Misses', 'Browser Cached'],
                                datasets: [{
                                data: [0,0,0],
                                backgroundColor: [
                                    $store.getters.current.green,
                                    $store.getters.current.red,
                                    $store.getters.current.yellow,
                                ]}]}"
                       :options="{
                            maintainAspectRatio: false,
                            cutoutPercentage: 65,
                            centerText: {
                                display: true,
                            },
                            legend: {
                            labels: {
                                fontColor: $store.getters.current.textColor,
                            }}, title: {
                                    display: true,
                                    text: 'Reliability',
                                    fontColor: $store.getters.current.textColor,
                            }}"
                       :plugins="[{
                            beforeDraw: function(chart, options) {
                                if (chart.config.options.centerText.display !== null &&
                                    typeof chart.config.options.centerText.display !== 'undefined' &&
                                            chart.config.options.centerText.display) {
                                        let width = chart.chart.width,
                                            height = chart.chart.height,
                                            ctx = chart.chart.ctx,
                                            centerX = ((chart.chartArea.left + chart.chartArea.right) / 2),
                                            centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2),
                                            percent = (chart.data.datasets[0].data[0]/(chart.data.datasets[0].data[1] + chart.data.datasets[0].data[0]) * 100).toFixed(2);
                                        if(percent === 'NaN')
                                            percent = 0
                                        ctx.restore();
                                        ctx.textAlign = 'center';
                                        let fontSize = (Math.min(height,width) / 134).toFixed(2);
                                        ctx.font = fontSize + 'em sans-serif';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillStyle = ['hsl(', ((percent/100) * 120).toString(10), ',100%,40%)'].join('');
                                        let text = percent + '%';
                                        ctx.fillText(text, centerX, centerY);
                                        ctx.save();
                                    }
                            }
                       }]"
                />
            </v-col>
            <v-col cols="12" md="8">
                <graph graph-id="netact"
                       height="250"
                       md-up-height="300"
                       type="line"
                       :data="{datasets: netactdata}"
                       :options="{
                            maintainAspectRatio: false,
                            elements: {
                                    line: {
                                        tension: 0
                                    }
                                },
                            legend: {
                                labels: {
                                    fontColor: $store.getters.current.textColor,
                                }
                            }, title: {
                                display: true,
                                text: 'Network Activity',
                                fontColor: $store.getters.current.textColor,
                            },
                            scales: dataScaleConfig}"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <graph graph-id="reqserved"
                       height="250"
                       md-up-height="300"
                       type="line"
                       :data="{
                            labels: [],
                            datasets: reqdata}"
                       :options="{
                            maintainAspectRatio: false,
                            point: {
                                pointBackgroundColor: 'rgba(0,0,0,0)',
                                pointBorderColor: 'rgba(0,0,0,0)',
                            },
                            elements: {
                                    line: {
                                        tension: 0
                                    }
                                },
                            legend: {
                                labels: {
                                    fontColor: $store.getters.current.textColor,
                                }

                            }, title: {
                                    display: true,
                                    text: 'Requests Served',
                                    fontColor: $store.getters.current.textColor,
                            },
                            scales: graphScaleConfig}"
                />
            </v-col>
            <v-col cols="12" md="6">
                <graph graph-id="sizondisk"
                       height="250"
                       md-up-height="300"
                       type="line"
                       :data="{
                            labels: [],
                            datasets: diskdata}"
                       :options="{
                            maintainAspectRatio: false,
                            point: {
                                pointBackgroundColor: 'rgba(0,0,0,0)',
                                pointBorderColor: 'rgba(0,0,0,0)',
                            },
                            elements: {
                                    line: {
                                        tension: 0
                                    }
                                },
                            legend: {
                                labels: {
                                    fontColor: $store.getters.current.textColor,
                                }
                            }, title: {
                                display: true,
                                text: 'Space Used',
                                fontColor: $store.getters.current.textColor,
                            },
                            scales: dataScaleConfig}"
                />
            </v-col>
        </v-row>
        <v-row>
            <!--            <v-col cols="12" md="6">-->
            <!--                <graph graph-id="cpu"-->
            <!--                       height="250"-->
            <!--                       md-up-height="300"-->
            <!--                       type="line"-->
            <!--                       :data="{-->
            <!--                            labels: [],-->
            <!--                            datasets: [{-->
            <!--                                label: 'Utilization',-->
            <!--                                data: [],-->
            <!--                                backgroundColor: $store.getters.current.accent1-->
            <!--                            },{-->
            <!--                                label: 'Clock',-->
            <!--                                data: [],-->
            <!--                                backgroundColor: $store.getters.current.accent1-->
            <!--                            }]}"-->
            <!--                       :options="{-->
            <!--                            maintainAspectRatio: false,-->
            <!--                            elements: {-->
            <!--                                    line: {-->
            <!--                                        tension: 0-->
            <!--                                    }-->
            <!--                                },-->
            <!--                            legend: {-->
            <!--                                labels: {-->
            <!--                                    fontColor: $store.getters.current.textColor,-->
            <!--                                }-->

            <!--                            }, title: {-->
            <!--                                    display: true,-->
            <!--                                    text: 'CPU',-->
            <!--                                    fontColor: $store.getters.current.textColor,-->
            <!--                            },-->
            <!--                            scales: {-->
            <!--                                yAxes: [{-->
            <!--                                    ticks: {-->
            <!--                                        beginAtZero: true,-->
            <!--                                        fontColor: $store.getters.current.textColor,-->
            <!--                                        maxTicksLimit: 11,-->
            <!--                                    }, gridLines: {-->
            <!--                                        color: $store.getters.current.accent-->
            <!--                                    }}],-->
            <!--                                xAxes: [{-->
            <!--                                    ticks: {-->
            <!--                                        fontColor: $store.getters.current.textColor,-->
            <!--                                        maxTicksLimit: 11,-->
            <!--                                        maxRotation: 45,-->
            <!--                                        minRotation: 0,-->
            <!--                                            callback: function(value, index, values) {-->
            <!--                                                let temp = value.toString();-->
            <!--                                                return temp.substr(temp.indexOf(' ') + 1, 8);-->
            <!--                                            }-->
            <!--                                    }, gridLines: {-->
            <!--                                        color: $store.getters.current.accent-->
            <!--                                    }}]}}"-->
            <!--                />-->
            <!--            </v-col>-->
            <!--            <v-col cols="12" md="6">-->
            <!--                <graph graph-id="ram"-->
            <!--                       height="250"-->
            <!--                       md-up-height="300"-->
            <!--                       type="line"-->
            <!--                       :data="{-->
            <!--                            labels: [],-->
            <!--                            datasets: [{-->
            <!--                                label: 'Ram Usage',-->
            <!--                                data: [],-->
            <!--                                backgroundColor: $store.getters.current.accent1-->
            <!--                            }]}"-->
            <!--                       :options="{-->
            <!--                            maintainAspectRatio: false,-->
            <!--                            elements: {-->
            <!--                                    line: {-->
            <!--                                        tension: 0-->
            <!--                                    }-->
            <!--                                },-->
            <!--                            legend: {-->
            <!--                                labels: {-->
            <!--                                    fontColor: $store.getters.current.textColor,-->
            <!--                                }-->
            <!--                            }, title: {-->
            <!--                                display: true,-->
            <!--                                text: 'Ram Used',-->
            <!--                                fontColor: $store.getters.current.textColor,-->
            <!--                            },-->
            <!--                            scales: {-->
            <!--                                yAxes: [{-->
            <!--                                    ticks: {-->
            <!--                                        beginAtZero: true,-->
            <!--                                        fontColor: $store.getters.current.textColor,-->
            <!--                                        maxTicksLimit: 11,-->
            <!--                                    }, gridLines: {-->
            <!--                                        color: $store.getters.current.accent-->
            <!--                                    }}],-->
            <!--                                xAxes: [{-->
            <!--                                    ticks: {-->
            <!--                                        fontColor: $store.getters.current.textColor,-->
            <!--                                        maxTicksLimit: 11,-->
            <!--                                        maxRotation: 45,-->
            <!--                                        minRotation: 0,-->
            <!--                                        callback: function(value, index, values) {-->
            <!--                                            let temp = value.toString();-->
            <!--                                            return temp.substr(temp.indexOf(' ') + 1, 8);-->
            <!--                                        }-->
            <!--                                    }, gridLines: {-->
            <!--                                        color: $store.getters.current.accent-->
            <!--                                    }}]}}"-->
            <!--                />-->
            <!--            </v-col>-->
        </v-row>
        <v-btn
                @click="evnt.$emit('pull')"
        >Update Now!
        </v-btn>
    </v-container>
</template>

<script>
    import Graph from "@/components/graph";
    import store from '../store/index';

    export default {
        name: 'Dashboard',
        components: {Graph},
        data() {
            return {
                graphScaleConfig: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: store.getters.current.textColor,
                            maxTicksLimit: 11,
                            padding: 10,
                        }, gridLines: {
                            color: store.getters.current.accent,
                            drawTicks: false
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        ticks: {
                            fontColor: store.getters.current.textColor,
                            maxRotation: 0,
                            autoSkipPadding: 22,
                            padding: 10,
                        }, gridLines: {
                            color: store.getters.current.accent,
                            drawTicks: false
                        }
                    }]
                },
                dataScaleConfig: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: store.getters.current.textColor,
                            maxTicksLimit: 11,
                            padding: 10,
                            callback: function (value) {
                                let temp = parseFloat(value.toString());
                                let abs = Math.abs(temp)
                                if (abs >= 1000000000000000)
                                    return (temp / 1000000000000000).toFixed(1) + 'pb';
                                if (abs >= 1000000000000)
                                    return (temp / 1000000000000).toFixed(1) + 'tb';
                                if (abs >= 1000000000)
                                    return (temp / 1000000000).toFixed(1) + 'gb';
                                if (abs >= 1000000)
                                    return (temp / 1000000).toFixed(1) + 'mb';
                                if (abs >= 1000)
                                    return (temp / 1000).toFixed(1) + 'kb';
                                return temp + 'b';
                            }
                        }, gridLines: {
                            color: store.getters.current.accent,
                            drawTicks: false
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        ticks: {
                            fontColor: store.getters.current.textColor,
                            maxRotation: 0,
                            autoSkipPadding: 22,
                            padding: 10,
                        }, gridLines: {
                            color: store.getters.current.accent,
                            drawTicks: false
                        }
                    }]
                },
                toolTips: {
                    mode: 'average'
                },
                hitmissdata: [0, 0, 0],
                netactdata: [{
                    label: 'Bytes Up',
                    data: [],
                    backgroundColor: store.getters.current.green + 'd0',
                    borderColor: store.getters.current.green + 'd0',
                    pointRadius: 0,
                    pointHitRadius: 10,
                    borderWidth: 1,
                }, {
                    label: 'Bytes Down',
                    data: [],
                    backgroundColor: store.getters.current.red + 'd0',
                    borderColor: store.getters.current.red + 'd0',
                    pointRadius: 0,
                    pointHitRadius: 10,
                    borderWidth: 1,
                }],
                diskdata: [{
                    label: 'Size On Disk',
                    data: [],
                    backgroundColor: store.getters.current.accent1,
                    borderColor: store.getters.current.accent1 + 'd0',
                    pointRadius: 0,
                    pointHitRadius: 10,
                    borderWidth: 1,
                }],
                reqdata: [{
                    label: 'Requests Served',
                    data: [],
                    backgroundColor: store.getters.current.accent1,
                    borderColor: store.getters.current.accent1 + 'd0',
                    pointRadius: 0,
                    pointHitRadius: 10,
                    borderWidth: 1,
                }],
                evnt: Event,
            }
        },
        methods: {
            loadData: function () {
                let stats = store.getters.data.stats;
                this.netactdata[0].data = [];
                this.netactdata[1].data = [];
                this.diskdata[0].data = [];
                this.reqdata[0].data = [];
                for (let i = Math.max(stats.length - store.getters.data.maxPoints, 0); i < stats.length; i++) {
                    let key = Object.keys(stats[i])[0]
                    let inst = stats[i][key];
                    let hist = i > 1 ? stats[i - 1][Object.keys(stats[i - 1])[0]] : null;
                    let time = new Date(key.replace('T', ' ').replace('Z', ' '));
                    this.netactdata[0].data.push({
                        t: time, y: inst.bytes_sent
                    });
                    this.netactdata[1].data.push({
                        t: time, y: (hist ? (inst.bytes_on_disk - hist.bytes_on_disk) : 0)
                    });
                    this.diskdata[0].data.push({
                        t: time, y: inst.bytes_on_disk
                    });
                    this.reqdata[0].data.push({
                        t: time, y: (hist ? (inst.requests_served - hist.requests_served) : 0)
                    });
                }
                let end = stats[stats.length - 1][Object.keys(stats[stats.length - 1])[0]];
                if (end)
                    this.hitmissdata = [end.hits, end.misses, end.browser_cached]
                let charts = Graph.methods.getChart();
                for (let index in charts) {
                    charts[index].chart.update()
                }
            }
        },
        beforeMount() {
            if (localStorage.stats && store.getters.data.stats.length < 1) {
                store.commit('setStats', JSON.parse(localStorage.stats))
            } else {
                fetch("/api/pastStats")
                    .then(response => response.json())
                    .then(response => {
                        this.updateValues(response);
                    });
            }
            Graph.methods.clearChart();
            this.loadData();
        },
        mounted() {
            function updateValues(resp){
                let stats = store.getters.data.stats;
                let datahist = stats.length > 2 ? stats[stats.length - 2][Object.keys(stats[stats.length - 2])[0]] : null;
                let charts = Graph.methods.getChart();
                for (let key in resp) {
                    let data = resp[key];
                    let time = new Date(key.replace('T', ' ').replace('Z', ' '));
                    this.hitmissdata = [data.hits, data.misses, data.browser_cached]
                    this.reqdata[0].data.push({
                        t: time, y: (datahist ? (data.requests_served - datahist.requests_served) : 0)
                    });
                    this.netactdata[0].data.push({
                        t: time, y: data.bytes_sent
                    });
                    this.netactdata[1].data.push({
                        t: time, y: (data ? (data.bytes_on_disk - datahist.bytes_on_disk) : 0)
                    });
                    this.diskdata[0].data.push({
                        t: time, y: data.bytes_on_disk
                    });
                }
                for (let index in charts) {
                    charts[index].chart.update()
                }
            }
            Event.$on('update', (resp) => updateValues(resp))
        },
    }
</script>
