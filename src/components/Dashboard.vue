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
                                    $store.getters.current.red,
                                    $store.getters.current.green,
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
                <graph graph-id="reqserved"
                       height="200"
                       md-up-height="300"
                       type="line"
                       :data="{
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                datasets: [{
                                    label: 'Requests Served',
                                    data: [1, 2, 3, 4, 5, 5, 6, 7, 8],
                                    backgroundColor: [$store.getters.current.accent1]
                                }]}"
                       :options="{
                            maintainAspectRatio: false,
                            legend: {
                                labels: {
                                    fontColor: $store.getters.current.textColor,
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: $store.getters.current.textColor,
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}],
                                xAxes: [{
                                    ticks: {
                                        fontColor: $store.getters.current.textColor,
                                    }, gridLines: {
                                        color: $store.getters.current.accent
                                    }}]}}"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <graph graph-id="netact"
                       height="200"
                       md-up-height="300"
                       type="line"
                       :data="{
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                datasets: [{
                                    label: 'Bytes Up',
                                    data: [1, 2, 3, 4, 5, 5, 6, 7, 8],
                                    backgroundColor: [$store.getters.current.accent1]
                                }]}"
                       :options="{
                                maintainAspectRatio: false,
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
                                        }, gridLines: {
                                            color: $store.getters.current.accent
                                        }}],
                                    xAxes: [{
                                        ticks: {
                                            fontColor: $store.getters.current.textColor,
                                        }, gridLines: {
                                            color: $store.getters.current.accent
                                        }}]}}"
                />
            </v-col>
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
            updateData(){
                fetch("/api/stats")
                    .then(response => console.log(response))
                    .then(response => {
                        updateValues(response);
                    });
                function updateValues(data) {
                    console.log(data);
                }
            },

        }
    }
</script>
