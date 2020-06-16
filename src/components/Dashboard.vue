<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
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
                                data: [1, 5493, 14],
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
                       :data="{
                                labels: [],
                                datasets: [{
                                    label: 'Bytes Up',
                                    data: [],
                                    backgroundColor: $store.getters.current.green + 'd0',
                                },{
                                    label: 'Bytes Down',
                                    data: [],
                                    backgroundColor: $store.getters.current.red + 'd0',
                                }]}"
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
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: $store.getters.current.textColor,
                                            maxTicksLimit: 11,
                                        }, gridLines: {
                                            color: $store.getters.current.accent
                                        }}],
                                    xAxes: [{
                                        ticks: {
                                            fontColor: $store.getters.current.textColor,
                                            maxTicksLimit: 11,
                                            maxRotation: 45,
                                            minRotation: 0,
                                            callback: function(value, index, values) {
                                                let temp = value.toString();
                                                return temp.substr(temp.indexOf(' ') + 1, 5);
                                            }
                                        }, gridLines: {
                                            color: $store.getters.current.accent
                                        }}]}}"
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
                                datasets: [{
                                    label: 'Requests Served',
                                    data: [],
                                    backgroundColor: $store.getters.current.accent1
                                }]}"
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
                                    text: 'Requests Served',
                                    fontColor: $store.getters.current.textColor,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: $store.getters.current.textColor,
                                        maxTicksLimit: 11,
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}],
                                xAxes: [{
                                    ticks: {
                                        fontColor: $store.getters.current.textColor,
                                        maxTicksLimit: 11,
                                        maxRotation: 45,
                                        minRotation: 0,
                                            callback: function(value, index, values) {
                                                let temp = value.toString();
                                                return temp.substr(temp.indexOf(' ') + 1, 5);
                                            }
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}]}}"
                />
            </v-col>
            <v-col cols="12" md="6">
                <graph graph-id="sizondisk"
                       height="250"
                       md-up-height="300"
                       type="line"
                       :data="{
                                labels: [],
                                datasets: [{
                                    label: 'Size On Disk',
                                    data: [],
                                    backgroundColor: $store.getters.current.accent1
                                }]}"
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
                                    text: 'Space Used',
                                    fontColor: $store.getters.current.textColor,
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: $store.getters.current.textColor,
                                            maxTicksLimit: 11,
                                        }, gridLines: {
                                            color: $store.getters.current.accent
                                        }}],
                                    xAxes: [{
                                        ticks: {
                                            fontColor: $store.getters.current.textColor,
                                            maxTicksLimit: 11,
                                            maxRotation: 45,
                                            minRotation: 0,
                                            callback: function(value, index, values) {
                                                let temp = value.toString();
                                                return temp.substr(temp.indexOf(' ') + 1, 5);
                                            }
                                        }, gridLines: {
                                            color: $store.getters.current.accent
                                        }}]}}"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <graph graph-id="cpu"
                       height="250"
                       md-up-height="300"
                       type="line"
                       :data="{
                            labels: [],
                            datasets: [{
                                label: 'Utilization',
                                data: [],
                                backgroundColor: $store.getters.current.accent1
                            },{
                                label: 'Clock',
                                data: [],
                                backgroundColor: $store.getters.current.accent1
                            }]}"
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
                                    text: 'CPU',
                                    fontColor: $store.getters.current.textColor,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: $store.getters.current.textColor,
                                        maxTicksLimit: 11,
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}],
                                xAxes: [{
                                    ticks: {
                                        fontColor: $store.getters.current.textColor,
                                        maxTicksLimit: 11,
                                        maxRotation: 45,
                                        minRotation: 0,
                                            callback: function(value, index, values) {
                                                let temp = value.toString();
                                                return temp.substr(temp.indexOf(' ') + 1, 5);
                                            }
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}]}}"
                />
            </v-col>
            <v-col cols="12" md="6">
                <graph graph-id="ram"
                       height="250"
                       md-up-height="300"
                       type="line"
                       :data="{
                            labels: [],
                            datasets: [{
                                label: 'Ram Usage',
                                data: [],
                                backgroundColor: $store.getters.current.accent1
                            }]}"
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
                                text: 'Ram Used',
                                fontColor: $store.getters.current.textColor,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: $store.getters.current.textColor,
                                        maxTicksLimit: 11,
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}],
                                xAxes: [{
                                    ticks: {
                                        fontColor: $store.getters.current.textColor,
                                        maxTicksLimit: 11,
                                        maxRotation: 45,
                                        minRotation: 0,
                                        callback: function(value, index, values) {
                                            let temp = value.toString();
                                            return temp.substr(temp.indexOf(' ') + 1, 5);
                                        }
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}]}}"
                />
            </v-col>
        </v-row>
        <v-btn
                @click="updateData"
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
            return {}
        },
        methods: {
            updateData() {
                fetch("/api/stats")
                    .then(response => response.json())
                    .then(response => {
                        this.updateValues(response);
                    });
                // this.updateValues({
                //     '2020-06-16T17:19:03.560Z': {
                //         requests_served: Math.floor(Math.random() * 10),
                //         cache_hits: Math.floor(Math.random() * 10),
                //         cache_misses: Math.floor(Math.random() * 10),
                //         browser_cached: Math.floor(Math.random() * 10),
                //         bytes_sent: Math.floor(Math.random() * 100),
                //         bytes_rec: -Math.floor(Math.random() * 100),
                //         bytes_on_disk: Math.floor(Math.random() * 1000),
                //     }
                // })
            },
            updateValues(resp) {
                let stats = store.getters.data.stats;
                stats.push(resp);
                let datahist = stats.length > 2 ? stats[stats.length - 2][Object.keys(resp)[0]]: null;

                let charts = Graph.methods.getChart();
                for (let key in resp) {
                    let data = resp[key];
                    let label = key.replace('T', ' ').replace('Z', ' ');
                    for (let i = 0; i < charts.length; i++) {
                        let cdata = charts[i].chart.data;
                        if (charts[i].chartid === "hitmiss") {
                            cdata.datasets[0].data[0] = data.cache_hits;
                            cdata.datasets[0].data[1] = data.cache_misses;
                            cdata.datasets[0].data[2] = data.browser_cached;
                        } else if (charts[i].chartid === "reqserved") {
                            cdata.labels.push(label);
                            cdata.datasets.forEach((dataset) => {
                                dataset.data.push(datahist ? (data.requests_served - datahist.requests_served) : 0);
                            });
                        } else if (charts[i].chartid === "netact") {
                            cdata.labels.push(label);
                            cdata.datasets.forEach((dataset) => {
                                if (dataset.label === "Bytes Up")
                                    dataset.data.push(0);
                                else
                                    dataset.data.push(datahist ? (data.bytes_sent - datahist.bytes_sent) : 0);
                            });
                        } else if (charts[i].chartid === "sizondisk") {
                            cdata.labels.push(label);
                            cdata.datasets.forEach((dataset) => {
                                dataset.data.push(datahist ? (data.bytes_on_disk - datahist.bytes_on_disk) : 0);
                            });
                        } else {
                            cdata.labels.push('yyyy-mm-dd hh:mm:ss:ms');
                            cdata.datasets.forEach((dataset) => {
                                dataset.data.push(dataset.data.length > 1 ? Math.floor(Math.random() * 1000) - dataset.data[dataset.data.length - 1] : 0);
                            })
                        }
                        if (cdata.labels.length > store.getters.data.maxPoints) {
                            cdata.labels.splice(0, cdata.labels.length - store.getters.data.maxPoints);
                            cdata.datasets.forEach((dataset) => {
                                dataset.data.splice(0, dataset.data.length - store.getters.data.maxPoints);
                            })
                        }
                        charts[i].chart.update();
                    }
                }
            }
        },
        mounted() {
            fetch("/api/pastStats")
                .then(response => response.json())
                .then(response => {
                    this.updateValues(response);
                });
            setInterval(this.updateData, 2000);
        }
    }
</script>
