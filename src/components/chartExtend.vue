<template>
    <chart
            style="height: 100%;width: 100%"
            :theme="theme"
            :initOptions="initOptions"
            :group="group"
            :autoresize="autoresize"
            :watchShallow="watchShallow"
            :manualUpdate="manualUpdate"
    />
</template>

<script>
    import chart from "vue-echarts";

    export default {
        name: "chartExtend",
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
    }
</script>

<style scoped>

</style>