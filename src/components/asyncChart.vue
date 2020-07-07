<template>
    <div ref="gcontainer">
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
                    }],
                    instance: null
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
            this.$refs.placeholder.$el.style.width = this.$el.style.width
            this.$refs.placeholder.$el.style.height = this.$el.style.height
            this.$nextTick(() => {
                this.instance = new ComponentClass({
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
                this.instance.$mount()
                this.instance.$el.style.width = this.$el.style.width
                this.instance.$el.style.height = this.$el.style.height
                this.instance.chart.on('finished', () => {
                    this.instance.chart.off('finished')
                    this.$refs.gcontainer.removeChild(this.$refs.placeholder.$el)
                    this.$refs.gcontainer.appendChild(this.instance.$el)
                })
            })
        },
        beforeDestroy(){
            this.instance.$destroy()
        }
    }
</script>

<style scoped>

</style>