<template>

    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <h1>Dashboard</h1>
        <v-row>
            <v-col cols="12" md="4">
                <graph graph-id="hitmiss"
                       height="300"
                       md-up-height="300"
                       type="doughnut"
                       :data="{
                                labels: ['Hits', 'Misses', 'Browser Cached'],
                                datasets: [{
                                data: [213, 543, 123],
                                backgroundColor: [
                                    $store.getters.current.green,
                                    $store.getters.current.red,
                                    $store.getters.current.yellow,
                                ]}]}"
                       :options="{
                            maintainAspectRatio: false,
                            legend: {
                            labels: {
                                fontColor: $store.getters.current.textColor,
                            }}}"
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
                                                return temp.substr(temp.indexOf('T') + 1, 5);
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
                                                return temp.substr(temp.indexOf('T') + 1, 5);
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
                                                return temp.substr(temp.indexOf('T') + 1, 5);
                                            }
                                        }, gridLines: {
                                            color: $store.getters.current.accent
                                        }}]}}"
                />
            </v-col>
        </v-row>
        <v-row>

        </v-row>
        <v-btn
                @click="updateData"
        ></v-btn>
    </v-container>
</template>

<script>
    import Graph from "@/components/graph";

    export default {
        name: 'Dashboard',
        components: {Graph},
        data() {
            return {
                height: 200,
                mdupheight: 330,
            }
        },
        methods: {
            updateData() {
                // fetch("/api/stats")
                //     .then(response => console.log(response))
                //     .then(response => {
                //         updateValues(response);
                //     });
                let temp = {
                    requests_served: Math.floor(Math.random() * 10),
                    cache_hits: Math.floor(Math.random() * 10),
                    cache_misses: Math.floor(Math.random() * 10),
                    browser_cached: Math.floor(Math.random() * 10),
                    bytes_sent: Math.floor(Math.random() * 100),
                    bytes_rec: -Math.floor(Math.random() * 100),
                    bytes_on_disk: Math.floor(Math.random() * 1000),
                }
                updateValues(temp)

                function updateValues(data) {
                    let charts = Graph.methods.getChart();
                    for (let i = 0; i < charts.length; i++) {
                        if (charts[i].chartid === "hitmiss") {
                            charts[i].chart.data.datasets[0].data[0] = data.cache_hits;
                            charts[i].chart.data.datasets[0].data[1] = data.cache_misses;
                            charts[i].chart.data.datasets[0].data[2] = data.browser_cached;
                        }
                        if (charts[i].chartid === "reqserved") {
                            charts[i].chart.data.labels.push('yyyy-mm-ddThh:mm:ss:msZ');
                            charts[i].chart.data.datasets.forEach((dataset) => {
                                dataset.data.push(data.requests_served);
                            });
                        }
                        if (charts[i].chartid === "netact") {
                            charts[i].chart.data.labels.push('yyyy-mm-ddThh:mm:ss:msZ');
                            charts[i].chart.data.datasets.forEach((dataset) => {
                                if (dataset.label === "Bytes Up")
                                    dataset.data.push(data.bytes_sent);
                                else
                                    dataset.data.push(data.bytes_rec);
                            });
                        }
                        if (charts[i].chartid === "sizondisk") {
                            charts[i].chart.data.labels.push('yyyy-mm-ddThh:mm:ss:msZ');
                            charts[i].chart.data.datasets.forEach((dataset) => {
                                dataset.data.push(data.bytes_on_disk);
                            });
                        }
                        charts[i].chart.update();
                    }
                }
            },

        }
    }
</script>
