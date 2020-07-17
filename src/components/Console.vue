<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}" style="height: 100%">
        <v-container fluid class="pt-0 pb-0"
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <v-row>
                <v-col>
                    <h1 class="pl-1">Console</h1>
                </v-col>
                <v-col>
                    <v-btn
                            :style="{color: $store.getters.current.textColor}"
                            :color="$store.getters.current.accent1"
                            elevation="0"
                            tile
                            style="position: absolute; right: 0;margin-right: 28px; margin-top: 5px"
                    >Disconnected
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <grid-layout
                style="width: calc(100% + 24px); left: -12px"
                :layout.sync="$store.getters.console.grid"
                :col-num="24"
                :row-height="30"
                :margin="[12,12]"
                :is-draggable="$store.getters.options.exp_consoleGrid"
                :is-resizable="$store.getters.options.exp_consoleGrid"
                :vertical-compact="false"
                @layout-updated="() => {localStorage.consoleLayout = JSON.stringify($store.getters.console.grid)}"
                @layout-ready="() => $nextTick(() => $refs.term[0].fit())"
        >
            <grid-item v-for="(item,index) in $store.getters.console.grid"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       :key="index"
                       :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                       drag-allow-from=".vue-draggable-handle"
                       drag-ignore-from=".no-drag"
                       @resize="$refs.term[0].fit()"
                       @resized="() => $nextTick(() => $refs.term[0].fit())"
            >
                <v-container fluid style="position: absolute; height: 100%; width: 100%"
                             :class="$store.getters.options.exp_consoleGrid ? 'pa-4':'pa-0'">
                    <xterm v-if="item.c === 0" style="width: 100%; height: 100%; background-color: black" ref="term"/>
                    <div v-if="item.c === 1" :style="{color: $store.getters.current.textColor}">
                        <v-row>
                            <v-col>
                                <h3>Some Buttons</h3>
                            </v-col>
                            <v-col>
                                <h3>Some Buttons</h3>
                            </v-col>
                            <v-col>
                                <h3>Some Buttons</h3>
                            </v-col>
                            <v-col>
                                <h3>Some Buttons</h3>
                            </v-col>
                            <v-col>
                                <h3>Some Buttons</h3>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-if="item.c === 2" :style="{color: $store.getters.current.textColor}">
                        <v-container fluid>
                            <v-row dense>
                                <v-col><h3>Some Status</h3></v-col>
                                <v-col><h5>Probably Online</h5></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col><h3>Another Status</h3></v-col>
                                <v-col><h5>Maybe Online</h5></v-col>
                            </v-row>
                        </v-container>
                    </div>
                </v-container>
                <div v-if="$store.getters.options.exp_consoleGrid">
                    <v-fade-transition>
                        <v-hover v-slot:default="{ hover }">
                            <v-icon
                                    :style="{position: 'absolute', color: hover ? $store.getters.current.textColor : $store.getters.current.accent, left: 'calc(50% - 5px)', width: '10px'}"
                                    dense small
                                    class="vue-draggable-handle">mdi-drag-horizontal-variant
                            </v-icon>
                        </v-hover>
                    </v-fade-transition>
                    <v-fade-transition>
                        <v-hover v-slot:default="{ hover }">
                            <v-icon
                                    :style="{position: 'absolute', color: hover ? $store.getters.current.textColor : $store.getters.current.accent, top: '2px', right: '2px'}"
                                    dense small
                            >mdi-close
                            </v-icon>
                        </v-hover>
                    </v-fade-transition>
                    <v-fade-transition>
                        <v-hover v-slot:default="{ hover }">
                            <v-icon
                                    :style="{position: 'absolute', color: hover ? $store.getters.current.textColor : $store.getters.current.accent, bottom: '2px', right: '2px', zIndex: 1}"
                                    dense small
                                    class="vue-resizable-handle pa-0"
                            >mdi-resize-bottom-right
                            </v-icon>
                        </v-hover>
                    </v-fade-transition>
                </div>
            </grid-item>
        </grid-layout>
    </v-container>
</template>

<script>
    import Xterm from "@/components/xterm";

    export default {
        name: "Console",
        components: {Xterm},
        data() {
            return {
                localStorage: localStorage,
            }
        },
    }
</script>

<style scoped>

</style>