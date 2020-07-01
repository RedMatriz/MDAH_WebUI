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
    </v-container>
</template>

<script>
    import store from '../store/index'

    export default {
        name: "About",
        data() {
            return {
                infoList: [{
                    name: 'Client Version',
                    shortValue: '1.0.0',
                    longValue: 'latest: x.x.x'
                }, {
                    name: 'Total Hits',
                    unitLabel: 'hits',
                    longValue: store.getters.data.hits[store.getters.data.hits.length - 1][1],
                    shortValue: this.byteFormat(store.getters.data.hits[store.getters.data.hits.length - 1][1], this.dataUnits),
                }, {
                    name: 'Total Misses',
                    unitLabel: 'misses',
                    longValue: store.getters.data.misses[store.getters.data.misses.length - 1][1],
                    shortValue: this.byteFormat(store.getters.data.misses[store.getters.data.misses.length - 1][1], this.dataUnits),
                }, {
                    name: 'Total Data Sent',
                    unitLabel: 'bytes',
                    longValue: store.getters.data.bytesSent[store.getters.data.bytesSent.length - 1][1],
                    shortValue: this.byteFormat(store.getters.data.bytesSent[store.getters.data.bytesSent.length - 1][1], this.dataUnits),
                }, {
                    name: 'Total Requests Served',
                    unitLabel: 'requests',
                    longValue: store.getters.data.reqServ[store.getters.data.reqServ.length - 1][1],
                    shortValue: this.byteFormat(store.getters.data.reqServ[store.getters.data.reqServ.length - 1][1], this.dataUnits),
                }, {
                    name: 'Cache Size',
                    unitLabel: 'bytes',
                    longValue: store.getters.data.sizeDisk[store.getters.data.sizeDisk.length - 1][1],
                    shortValue: this.byteFormat(store.getters.data.sizeDisk[store.getters.data.sizeDisk.length - 1][1], this.dataUnits),
                }]
            }
        }
    }
</script>

<style scoped>

</style>