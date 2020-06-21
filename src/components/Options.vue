<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1 class="pl-1">Settings</h1>
        </v-container>
        <v-row>
            <v-col cols="12" md="6">
                <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                             class="pa-5 pb-9">
                    <h3>Web Settings</h3>
                    <div style="width: 100%; height: 1px;" :style="{backgroundColor: $store.getters.current.accent2}"
                         class="mt-2 mb-2"/>
                    <h4>Display</h4>
                    <v-row>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Theme
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-select
                                    :label="$vuetify.breakpoint.mdAndDown ? 'Theme' : ''"
                                    :items="items"
                                    item-value="val"
                                    item-text="disp"
                                    @input="setTheme"
                                    :value="$store.state.current"
                                    :color="$store.getters.current.textColor"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                    </v-row>
                    <v-row v-if="!$vuetify.breakpoint.mdAndDown">
                        <v-col cols="4" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Show App Bar
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-container class="pt-1 pl-0">
                                <v-switch
                                        v-model="showbar"
                                        @change="$store.commit('showAppBar', showbar)"
                                        :dark="$store.getters.current.isDark"
                                >
                                </v-switch>
                            </v-container>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Background
                                Image
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-container class="pt-1 pl-0">
                                <v-switch
                                        :label="$vuetify.breakpoint.mdAndDown? 'Background Image': ''"
                                        v-model="hasBgImage"
                                        @change="$store.commit('setHasBg', hasBgImage)"
                                        :dark="$store.getters.current.isDark"
                                />
                            </v-container>
                        </v-col>
                    </v-row>
                    <v-row v-if="hasBgImage">
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Image URL
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-text-field
                                    :label="$vuetify.breakpoint.mdAndDown? 'Image URL': ''"
                                    v-model="bgimg"
                                    :dark="$store.getters.current.isDark"
                                    @change="$store.commit('setBgUrl', bgimg)"
                            />
                        </v-col>
                    </v-row>
                    <v-row v-if="!$vuetify.breakpoint.mdAndDown">
                        <v-col cols="4" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Dashboard
                            </v-subheader>
                        </v-col>
                        <v-col cols="8" class="pt-0 pb-0">
                            <v-container class="mt-1 pl-0">
                                <v-btn
                                        @click="$store.commit('resetLayout')"
                                        :style="{color: $store.getters.current.textColor}"
                                        :color="$store.getters.current.accent1"
                                        v-if="!$vuetify.breakpoint.mdAndDown"
                                >
                                    Reset
                                </v-btn>
                            </v-container>
                        </v-col>
                    </v-row>
                    <h4>Data</h4>
                    <v-row>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Data Refresh
                                Rate
                            </v-subheader>
                        </v-col>
                        <v-col cols="8" class="pt-0 pb-0">
                            <v-text-field
                                    :label="$vuetify.breakpoint.mdAndDown? 'Data Refresh Rate': ''"
                                    v-model="$store.getters.data.updateInterval"
                                    :dark="$store.getters.current.isDark"
                                    :error-messages="referr"
                                    @input="checkNan"
                                    @change="commit"
                                    suffix="ms"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Stats
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-container class="mt-1 pl-0">
                                <v-btn @click="$store.commit('resetStats')"
                                       :style="{color: $store.getters.current.textColor}"
                                       :color="$store.getters.current.accent1"
                                       v-if="!$vuetify.breakpoint.mdAndDown">
                                    Reset
                                </v-btn>
                                <v-btn @click="$store.commit('resetStats')"
                                       :style="{color: $store.getters.current.textColor}"
                                       :color="$store.getters.current.accent1"
                                       v-if="$vuetify.breakpoint.mdAndDown">
                                    Reset Stats
                                </v-btn>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col cols="12" md="6">
                <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                             class="pa-5 pb-9">
                    <h3>Client Settings</h3>
                    <div style="width: 100%; height: 1px;" :style="{backgroundColor: $store.getters.current.accent2}"
                         class="mt-2 mb-2"/>
                    <v-row>
                        <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Cache Size
                            </v-subheader>
                        </v-col>
                        <v-col cols="8" md="6" class="pt-0 pb-0">
                            <v-text-field
                                    :label="$vuetify.breakpoint.mdAndDown ? 'Max Cache Size' : ''"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                        <v-col cols="4" md="2" class="pt-0 pb-0">
                            <v-select
                                    :items="bytes"
                                    item-text="disp"
                                    item-value="val"
                                    :value="1"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Bits Per
                                Hour
                            </v-subheader>
                        </v-col>
                        <v-col cols="8" md="6" class="pt-0 pb-0">
                            <v-text-field
                                    :label="$vuetify.breakpoint.mdAndDown ? 'Max Bits Per Hour' : ''"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                        <v-col cols="4" md="2" class="pt-0 pb-0">
                            <v-select
                                    :items="bits"
                                    item-text="disp"
                                    item-value="val"
                                    :value="1"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Bits Per
                                Second
                            </v-subheader>
                        </v-col>
                        <v-col cols="8" md="6" class="pt-0 pb-0">
                            <v-text-field
                                    :label="$vuetify.breakpoint.mdAndDown ? 'Max Bits Per Second' : ''"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                        <v-col cols="4" md="2" class="pt-0 pb-0">
                            <v-select
                                    :items="bits"
                                    item-text="disp"
                                    item-value="val"
                                    :value="1"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Client Port
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-text-field
                                    :label="$vuetify.breakpoint.mdAndDown ? 'Client Port' : ''"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Threads
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-text-field
                                    :label="$vuetify.breakpoint.mdAndDown ? 'Max Threads' : ''"
                                    :dark="$store.getters.current.isDark"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <!--            <v-row>-->
            <!--                <v-col cols="4">-->
            <!--                    <v-subheader :style="{color: $store.getters.current.textColor}"-->
            <!--                                 class="pt-5"></v-subheader>-->
            <!--                </v-col>-->
            <!--                <v-col cols="8">-->

            <!--                </v-col>-->
            <!--            </v-row>-->
        </v-row>
    </v-container>
</template>

<script>
    import store from "../store/index";

    export default {
        name: "Options",
        methods: {
            setTheme(newt) {
                store.state.current = newt;
                localStorage.theme = newt;
                store.commit('setTheme', newt);
                document.body.style.backgroundColor = store.getters.current.backgroundColor;
            },
            commit() {
                if (this.referr === '') {
                    localStorage.refresh = store.getters.data.updateInterval
                }
            },
            checkNan(val) {
                if (isNaN(val))
                    this.referr = 'That is not a number!';
                else {
                    this.referr = ''
                }
            }
        },
        data() {
            return {
                items: [{
                    disp: 'Light',
                    val: 'light'
                }, {
                    disp: 'Dark',
                    val: 'dark'
                }, {
                    disp: 'Midnight',
                    val: 'midnight'
                }],
                bytes: [{
                    disp: 'Bytes',
                    val: 1
                }, {
                    disp: 'Kilobytes',
                    val: 1000
                }, {
                    disp: 'Megabytes',
                    val: 1000000
                }, {
                    disp: 'Gigabytes',
                    val: 1000000000
                }, {
                    disp: 'Terabytes',
                    val: 1000000000000
                }, {
                    disp: 'Petabytes',
                    val: 1000000000000000
                }, {
                    disp: 'Exabytes',
                    val: 1000000000000000000
                }, {
                    disp: 'Zettabytes',
                    val: 1000000000000000000000
                }, {
                    disp: 'Yottabytes',
                    val: 1000000000000000000000000
                }],
                bits: [{
                    disp: 'Bits',
                    val: 1
                }, {
                    disp: 'Kilobits',
                    val: 1000
                }, {
                    disp: 'Megabits',
                    val: 1000000
                }, {
                    disp: 'Gigabits',
                    val: 1000000000
                }, {
                    disp: 'Terabits',
                    val: 1000000000000
                }, {
                    disp: 'Petabits',
                    val: 1000000000000000
                }, {
                    disp: 'Exabits',
                    val: 1000000000000000000
                }, {
                    disp: 'Zettabits',
                    val: 1000000000000000000000
                }, {
                    disp: 'Yottabits',
                    val: 1000000000000000000000000
                }],
                hasBgImage: store.getters.hasBgImage,
                bgimg: store.getters.bgImg,
                referr: '',
                showbar: store.getters.showAppBar,
            }
        },
        computed: {
            hasbg() {
                return store.getters.hasBgImage;
            },
            bgurl() {
                return store.getters.bgImg;
            },
            showAppBar() {
                return store.getters.showAppBar
            }
        },
        watch: {
            hasbg() {
                localStorage.hasbg = store.getters.hasBgImage;
                this.hasBgImage = store.getters.hasBgImage;
            },
            bgurl() {
                localStorage.bg = store.getters.bgImg;
                this.bgimg = store.getters.bgImg;
            },
            showAppBar() {
                localStorage.showBar = store.getters.showAppBar
            }
        }

    }
</script>

<style>
</style>