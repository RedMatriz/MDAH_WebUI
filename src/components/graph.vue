<template>
    <v-container fluid
                 :style="{backgroundColor: $store.getters.current.secondary, height: ($vuetify.breakpoint.mdAndUp ? mdUpHeight : height) + 'px'}">
        <canvas :id="graphId"></canvas>
    </v-container>
</template>

<script>
    import Chart from 'chart.js';

    let chart = null;
    export default {
        name: "graph",
        props: ['graphId', 'type', 'data', 'options', 'mdUpHeight', 'height'],
        methods: {
            createChart(chartID) {
                const ctx = document.getElementById(chartID);
                chart = new Chart(ctx, {
                    type: this.type,
                    data: this.data,
                    options: this.options,
                });
            },
            getChart() {
                return chart;
            }
        },
        mounted() {
            this.createChart(this.graphId,)
        }
    }
</script>

<style scoped>

</style>