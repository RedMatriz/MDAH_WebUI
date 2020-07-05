<template>
    <grid-layout
            style="width: 100%;"
            :layout.sync="store.getters.layout.grid"
            :col-num="12"
            :row-height="30"
            :margin="[12,12]"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
    >
        <grid-item v-for="(item, index) in store.getters.layout.grid"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i"
                   :style="{backgroundColor: store.getters.current.secondary + store.getters.alpha, color: store.getters.current.accent}"
                   drag-allow-from=".vue-draggable-handle"
                   drag-ignore-from=".no-drag"
                   @move="moved"
                   @resize="resized"

        >
            <v-container fluid style="height: 100%;width: 100%; position: absolute" class="no-drag">
                <chart
                        style="height: 100%;width: 100%"
                        autoresize
                        :options="store.getters.layout.charts[index]"
                />
            </v-container>
            <v-icon :style="{position: 'absolute', color: store.getters.current.accent, left: 'calc(50% - 5px)', width: '10px'}"
                    dense small
                    class="vue-draggable-handle">mdi-drag-horizontal-variant
            </v-icon>
            <v-icon :style="{position: 'absolute', color: store.getters.current.accent, bottom: '2px', right: '2px'}"
                    dense small
            >mdi-resize-bottom-right
            </v-icon>
            <v-icon :style="{position: 'absolute', color: store.getters.current.accent, top: '2px', right: '2px'}"
                    dense small
                    @click="store.commit('removeLayoutContainer',item.i)"
            >mdi-close
            </v-icon>
        </grid-item>
    </grid-layout>
</template>

<script>
    import store from "@/store";
    import vuetify from "@/plugins/vuetify";

    export default {
        name: "dashGrid",
        components: {
            chart: () => import('../components/asyncChart'),
        },
        data() {
            return {
                store: store,
                vuetify: vuetify
            }
        },
        methods: {
            moved(i, newX, newY) {
                store.commit('setSpecificLayout', {i: i, x: newX, y: newY})
            },
            resized(i, newH, newW) {
                store.commit('setSpecificLayout', {i: i, w: newW, h: newH})
            },
        },
        computed: {
            update() {
                return store.getters.data.date;
            }
        },
        watch: {
            update() {
                store.getters.layout.charts.forEach((x) => {
                    if (x.type === 'pie') {
                        x.series[0].data.forEach((x) => {
                            switch (x.dataId) {
                                case 'Hits':
                                    x.value = store.getters.lastValueOf('hits')
                                    break
                                case 'Misses':
                                    x.value = store.getters.lastValueOf('misses')
                                    break
                                case 'Browser Cached':
                                    x.value = store.getters.lastValueOf('cached')
                                    break
                                case 'Requests Served':
                                    x.value = store.getters.lastValueOf('reqServ')
                                    break
                                case 'Bytes Sent':
                                    x.value = store.getters.lastValueOf('bytesSent')
                                    break
                                case 'Bytes On Disk':
                                    x.value = store.getters.lastValueOf('sizeDisk')
                                    break
                                case 'Change in Hits':
                                    x.value = store.getters.lastValueOf('hitsChange')
                                    break
                                case 'Change in Misses':
                                    x.value = store.getters.lastValueOf('missesChange')
                                    break
                                case 'Change in Browser Cached':
                                    x.value = store.getters.lastValueOf('cachedChange')
                                    break
                                case 'Change in Requests Served':
                                    x.value = store.getters.lastValueOf('reqServChange')
                                    break
                                case 'Change in Bytes Sent':
                                    x.value = store.getters.lastValueOf('bytesSentChange')
                                    break
                                case 'Change in Bytes On Disk':
                                    x.value = store.getters.lastValueOf('sizeDiskChange')
                                    break
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style>
    .vue-resizable-handle {
        background-image: none !important;
    }
</style>