<template>
    <grid-layout
            style="width: 100%;"
            :layout.sync="store.getters.layout.grid"
            :col-num="24"
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
            <chart
                    class="no-drag"
                    style="height: 100%;width: 100%; position: absolute"
                    autoresize
                    :options="store.getters.layout.charts[getIndex(item.i)]"
            />
            <v-fade-transition>
                <v-hover v-slot:default="{ hover }">
                    <v-icon :style="{position: 'absolute', color: hover ? store.getters.current.textColor : store.getters.current.accent, left: 'calc(50% - 5px)', width: '10px'}"
                            dense small
                            class="vue-draggable-handle">mdi-drag-horizontal-variant
                    </v-icon>
                </v-hover>
            </v-fade-transition>
            <v-fade-transition>
                <v-hover v-slot:default="{ hover }">
                    <v-icon :style="{position: 'absolute', color: hover ? store.getters.current.textColor : store.getters.current.accent, top: '2px', right: '2px'}"
                            dense small
                            @click="store.commit('removeLayoutContainer', index)"
                    >mdi-close
                    </v-icon>
                </v-hover>
            </v-fade-transition>
            <v-fade-transition>
                <v-hover v-slot:default="{ hover }">
                    <v-icon :style="{position: 'absolute', color: hover ? store.getters.current.textColor : store.getters.current.accent, bottom: '2px', right: '2px', zIndex: 1}"
                            dense small
                            class="vue-resizable-handle pa-0"
                    >mdi-resize-bottom-right
                    </v-icon>
                </v-hover>
            </v-fade-transition>
        </grid-item>
    </grid-layout>
</template>

<script>
    import store from "@/store";
    import vuetify from "@/plugins/vuetify";
    import {translate} from "@/constants";

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
            getIndex: (id) => {
                let indx = 0;
                store.getters.layout.grid.forEach((x, idx) => {
                    if (id === x.i) indx = idx
                })
                return indx
            }
        },
        computed: {
            update() {
                return store.getters.data.stats;
            }
        },
        watch: {
            update() {
                store.getters.layout.charts.forEach((x) => {
                    if (x.type === 'pie') {
                        x.series[0].data.forEach((x) => {
                            if (x.dataId)
                                x.value = store.getters.getLastValueOfDataset(translate(x.dataId, true))
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