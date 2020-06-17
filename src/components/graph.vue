<template>
    <v-container fluid
                 :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha, height: ($vuetify.breakpoint.mdAndUp ? mdUpHeight : height) + 'px'}">
        <canvas :id="graphId"></canvas>
    </v-container>
</template>

<script>
    import Chart from 'chart.js';
    let chart = [];
    export default {
        name: "graph",
        props: ['graphId', 'type', 'data', 'options', 'plugins', 'mdUpHeight', 'height'],
        methods: {
            createChart(chartID) {
                const ctx = document.getElementById(chartID);
                chart.push({
                    chart: new Chart(ctx, {
                        type: this.type,
                        data: this.data,
                        options: this.options,
                        plugins: this.plugins,
                    }), chartid: chartID
                });
            },
            getChart() {
                return chart;
            },
            clearChart(){
                chart = [];
            }
        }, mounted() {
            this.createChart(this.graphId)
        }
    }
</script>

<style scoped>

</style>