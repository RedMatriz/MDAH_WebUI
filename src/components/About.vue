<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1 class="pl-1">Info</h1>
        </v-container>
        <v-container fluid class="mt-3"
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <div v-for="(stat, index) in infoList" :key="index" style="width: 50%">
                <h3>{{stat.name}}</h3>
                <v-row dense>
                    <v-col><p>{{stat.shortValue}}</p></v-col>
                    <v-col v-if="stat.longValue"><p>{{stat.longValue + (stat.unitLabel ? ' ' + stat.unitLabel :
                        '')}}</p>
                    </v-col>
                </v-row>
            </div>
        </v-container>
<!--        <v-container fluid class="mt-3"-->
<!--                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">-->
<!--            <div v-for="(stat, index) in Object.keys($store.getters.data.datasets)" :key="index"-->
<!--                 style="width: 50%">-->
<!--                <h3>{{translate(stat)}}</h3>-->
<!--                <v-row dense>-->
<!--                    <v-col><p>{{$store.getters.getLastValueOfDataset(stat)}}</p></v-col>-->
<!--                </v-row>-->
<!--            </div>-->
<!--        </v-container>-->
    </v-container>
</template>

<script>
    import store from '../store/index'
    import {dataUnits, numberUnits, formatNumber, translate} from "@/constants";

    export default {
        name: "About",
        data() {
            return {
                rel: 0,
                infoList: [{
                    name: 'Client Version (Temporary fake data)',
                    shortValue: '1.0.0',
                    longValue: 'latest: x.x.x'
                }, {
                    name: 'Total Hits',
                    unitLabel: 'hits',
                    longValue: store.getters.getLastValueOfDataset('cache_hits'),
                    shortValue: formatNumber(store.getters.getLastValueOfDataset('cache_hits'), numberUnits),
                }, {
                    name: 'Total Misses',
                    unitLabel: 'misses',
                    longValue: store.getters.getLastValueOfDataset('cache_misses'),
                    shortValue: formatNumber(store.getters.getLastValueOfDataset('cache_misses'), numberUnits),
                }, {
                    name: 'Total Data Sent',
                    unitLabel: 'bytes',
                    longValue: store.getters.getLastValueOfDataset('bytes_sent'),
                    shortValue: formatNumber(store.getters.getLastValueOfDataset('bytes_sent'), dataUnits),
                }, {
                    name: 'Total Requests Served',
                    unitLabel: 'requests',
                    longValue: store.getters.getLastValueOfDataset('requests_served'),
                    shortValue: formatNumber(store.getters.getLastValueOfDataset('requests_served'), numberUnits),
                }, {
                    name: 'Cache Size',
                    unitLabel: 'bytes',
                    longValue: store.getters.getLastValueOfDataset('bytes_on_disk'),
                    shortValue: formatNumber(store.getters.getLastValueOfDataset('bytes_on_disk'), dataUnits),
                }],
            }
        },
        methods: {
            translate: (a) => translate(a)
        }
    }
</script>

<style scoped>

</style>