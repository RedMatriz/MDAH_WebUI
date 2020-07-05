<template>
    <div style="position: relative; width: 100%; height: 100%" ref="gcontainer">
        <chart
                style="height: 100%;width: 100%"
                ref="placeholder"
                :theme="theme"
                :options="defaultInit"
                :group="group"
                :autoresize="autoresize"
                :watchShallow="watchShallow"
                :manualUpdate="manualUpdate"
        />
    </div>
</template>

<script>
    import store from '../store/index'
    import chart from 'vue-echarts'
    import Vue from 'vue'

    let ComponentClass = Vue.extend(chart)
    export default {
        name: "async-chart",
        components: {chart},
        props: {
            options: Object,
            theme: [String, Object],
            initOptions: Object,
            group: String,
            autoresize: Boolean,
            watchShallow: Boolean,
            manualUpdate: Boolean
        },
        data() {
            return {
                defaultInit: {
                    title: this.options.title,
                    legend: this.options.legend,
                    grid: this.options.grid,
                    xAxis: this.options.xAxis,
                    yAxis: this.options.yAxis,
                    dataZoom: this.options.dataZoom,
                    series: [{
                        type: this.options.series[0].type
                    }]
                }
            }
        },
        mounted() {
            this.$refs.placeholder.showLoading({
                text: 'Loading…',
                color: store.getters.current.textColor,
                textColor: store.getters.current.textColor,
                maskColor: store.getters.current.primary +  '9f'
            })
            this.$nextTick(() => {
                let instance = new ComponentClass({
                    propsData: {
                        options: this.options,
                        theme: this.theme,
                        initOptions: this.initOptions,
                        group: this.group,
                        autoresize: this.autoresize,
                        watchShallow: this.watchShallow,
                        manualUpdate: this.manualUpdate
                    }
                })
                instance.$mount()
                instance.$el.style.width = '100%'
                instance.$el.style.height = '100%'
                instance.chart.on('finished', () => {
                    instance.chart.off('finished')
                    this.$refs.gcontainer.removeChild(this.$refs.placeholder.$el)
                    this.$refs.gcontainer.appendChild(instance.$el)
                })
            })
        },
    }
</script>

<style scoped>

</style>