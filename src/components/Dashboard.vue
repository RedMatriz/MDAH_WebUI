<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <h1>Dashboard</h1>
        <div style="height: 600px">
            <v-row>
                <v-col cols="4">
                    <v-container style="height: 300px"
                                 :style="{backgroundColor: $store.getters.current.secondary}">
                        <canvas id="hitpie"></canvas>
                    </v-container>
                </v-col>
                <v-col cols="8">
                    <v-container style="height: 300px"
                                 :style="{backgroundColor: $store.getters.current.secondary}">
                        <canvas id="reqserved"></canvas>
                    </v-container>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-container style="height: 300px" fluid
                                 :style="{backgroundColor: $store.getters.current.secondary}">
                        <canvas id="netact"></canvas>
                    </v-container>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import Chart from 'chart.js';
    import store from '../store/index';

    export default {
        name: 'Dashboard',
        methods: {
            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
            }
        },
        mounted() {
            this.createChart('hitpie', {
                type: 'doughnut',
                data: {
                    labels: ['Hits', 'Misses', 'Browser Cached'],
                    datasets: [{
                        data: [213, 543, 123],
                        backgroundColor: [
                            store.getters.current.red,
                            store.getters.current.green,
                            store.getters.current.yellow,
                        ]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontColor: store.getters.current.textColor,
                        }
                    }
                }
            })
            this.createChart('reqserved', {
                type: 'line',
                data: {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    datasets: [{
                        label: 'Requests Served',
                        data: [1, 2, 3, 4, 5, 5, 6, 7, 8],
                        backgroundColor: [store.getters.current.accent1]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontColor: store.getters.current.textColor,
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontColor: store.getters.current.textColor,
                            }, gridLines: {
                                color: store.getters.current.accent
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: store.getters.current.textColor,
                            }, gridLines: {
                                color: store.getters.current.accent
                            },
                        }]
                    }
                }
            })
            this.createChart('netact', {
                type: 'line',
                data: {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    datasets: [{
                        label: 'test',
                        data: [1, 2, 3, 4, 5, 5, 6, 7, 8],
                        backgroundColor: [store.getters.current.accent1]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontColor: store.getters.current.textColor,
                        }
                    }, title: {
                        display: true,
                        text: 'Network Activity'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontColor: store.getters.current.textColor,
                            }, gridLines: {
                                color: store.getters.current.accent
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: store.getters.current.textColor,
                            }, gridLines: {
                                color: store.getters.current.accent
                            },
                        }]
                    }
                }
            })

        }
    }
</script>
