<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}" style="position: relative; z-index: 1">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1 class="pl-1">Settings</h1>
        </v-container>
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                     class="pa-3 pb-9 mt-3">
            <h3>Web Settings</h3>
            <div style="width: 100%; height: 1px;" :style="{backgroundColor: $store.getters.current.accent2}"
                 class="mt-2 mb-2"/>
            <h4>Display</h4>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}">Theme
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-2 pb-0">
                    <v-select
                            dense
                            :label="$vuetify.breakpoint.mdAndDown ? 'Theme' : ''"
                            :items="items"
                            item-value="val"
                            item-text="disp"
                            @change="(val) => {$store.commit('setTheme', val); $vuetify.theme.themes.light = $store.getters.current; $vuetify.theme.dark = getLightness($store.getters.current.secondary) < 50}"
                            :value="$store.state.options.current"
                            item-color="active"
                            color="textColor"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                    />
                </v-col>
            </v-row>
            <v-expand-transition>
                <div v-if="$store.getters.options.current === 'custom' && $store.getters.options.superSecret"
                     style="position:relative;">
                    <div v-for="(item, index) in Object.keys($store.getters.themes.custom)" :key="index">
                        <v-row dense class="pl-3">
                            <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                                <v-subheader :style="{color: $store.getters.current.textColor}">{{item}}
                                </v-subheader>
                            </v-col>
                            <v-col cols="12" md="8" class="pt-02 pb-0">
                                <v-hover v-slot:default="{ hover }">
                                    <div
                                            style="position: relative; width: 150px; height: 30px; border: 2px solid;"
                                            :style="{backgroundColor: $store.getters.themes.custom[item], borderColor: $store.getters.current.textColor}"
                                    >
                                        <v-scroll-x-transition>
                                            <v-color-picker
                                                    v-if="hover"
                                                    elevation="3"
                                                    style="position: absolute; left: 148px; z-index: 9999"
                                                    :style="{backgroundColor: $store.getters.current.secondary, color: $store.getters.current.textColor + '!important'}"
                                                    class="textColor--text"
                                                    v-model="$store.getters.themes.custom[item]"
                                                    @input="() => localStorage.exp_customTheme = JSON.stringify($store.getters.themes.custom)"
                                            />
                                        </v-scroll-x-transition>
                                    </div>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </div>
                    <v-btn
                            style="position:absolute; right: 30px; bottom: 2px"
                            @click="$store.commit('resetCustom')"
                            :style="{color: $store.getters.current.textColor}"
                            :color="$store.getters.current.accent"
                    >
                        Reset
                    </v-btn>
                </div>
            </v-expand-transition>
            <v-row dense v-if="!$vuetify.breakpoint.mdAndDown">
                <v-col cols="4" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Show App Bar
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-switch
                            v-model="showbar"
                            @change="$store.commit('showAppBar', showbar)"
                            :color="$store.getters.current.active"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                    >
                    </v-switch>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Background
                        Image
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-switch
                            :label="$vuetify.breakpoint.mdAndDown? 'Background Image': ''"
                            v-model="hasBgImage"
                            @change="$store.commit('setHasBg', hasBgImage)"
                            :color="$store.getters.current.active"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                    />
                </v-col>
            </v-row>
            <v-expand-transition>
                <div v-if="hasBgImage" class="pl-3">
                    <v-row dense>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}">Image URL
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-text-field
                                    dense
                                    :label="$vuetify.breakpoint.mdAndDown? 'Image URL': ''"
                                    v-model="bgimg"
                                    color="textColor"
                                    :dark="getLightness($store.getters.current.secondary) < 50"
                                    @change="$store.commit('setBgUrl', bgimg)"
                            />
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}">Transparency
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-slider
                                    class="pt-1"
                                    min="0"
                                    max="255"
                                    v-model="$store.getters.themes.backgroundAlpha"
                                    @input="localStorage.backgroundAlpha = $store.getters.themes.backgroundAlpha"
                                    :label="$vuetify.breakpoint.mdAndDown? 'Transparency': ''"
                                    :track-color="$store.getters.current.accent"
                                    :thumb-color="$store.getters.current.textColor"
                                    :track-fill-color="$store.getters.current.active"
                                    :dark="getLightness($store.getters.current.secondary) < 50"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-expand-transition>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}"
                                 class="pt-5">Lock Dashboard
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-switch
                            :label="$vuetify.breakpoint.mdAndDown? 'Lock Dashboard': ''"
                            v-model="$store.getters.options.lockGrid"
                            @change="localStorage.lockGrid = $store.getters.options.lockGrid"
                            :color="$store.getters.current.active + '!important'"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                    />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-3">Dashboard
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-2 pb-0">
                    <v-btn
                            @click="$store.commit('resetLayout')"
                            :style="{color: $store.getters.current.textColor}"
                            :color="$store.getters.current.accent"
                            v-if="!$vuetify.breakpoint.mdAndDown"
                    >
                        Reset
                    </v-btn>
                    <v-btn
                            @click="$store.commit('resetLayout')"
                            :style="{color: $store.getters.current.textColor}"
                            :color="$store.getters.current.accent"
                            v-if="$vuetify.breakpoint.mdAndDown">
                        Reset Dashboard
                    </v-btn>
                </v-col>
            </v-row>
            <h4 class="mt-3">Data</h4>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Data Refresh
                        Rate
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-text-field
                            :label="$vuetify.breakpoint.mdAndDown? 'Data Refresh Rate': ''"
                            v-model="updateInterval"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            :error-messages="referr[0]"
                            color="textColor"
                            @input="(val) => {checkNan(val, 0); $store.commit('setRefresh', val)}"
                            @focusout="() => this.updateInterval = $store.getters.data.updateInterval"
                            suffix="ms"
                    />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Data Points
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-text-field
                            :label="$vuetify.breakpoint.mdAndDown? 'Max Data Points': ''"
                            v-model="maxpoints"
                            color="textColor"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            :error-messages="referr[1]"
                            @input="(val) => {checkNan(val, 1); $store.commit('setMaxStorePoints', val)}"
                            @focusout="() => this.maxpoints = $store.getters.data.maxStorePoints"
                    />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-2">Stats
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-2 pb-0">
                    <v-btn @click="$store.commit('resetStats')"
                           :style="{color: $store.getters.current.textColor}"
                           :color="$store.getters.current.accent"
                           v-if="!$vuetify.breakpoint.mdAndDown">
                        Reset
                    </v-btn>
                    <v-btn @click="$store.commit('resetStats')"
                           :style="{color: $store.getters.current.textColor}"
                           :color="$store.getters.current.accent"
                           v-if="$vuetify.breakpoint.mdAndDown">
                        Reset Stats
                    </v-btn>
                </v-col>
            </v-row>
            <v-expand-transition>
                <div v-if="$store.getters.options.superSecret">
                    <h4 class="mt-3">Experimental & WIP</h4>
                    <v-row dense>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">
                                Console Page
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-switch
                                    :label="$vuetify.breakpoint.mdAndDown? 'Console Page': ''"
                                    v-model="$store.getters.options.exp_showConsole"
                                    @change="localStorage.exp_showConsole = $store.getters.options.exp_showConsole"
                                    :color="$store.getters.current.active"
                                    :dark="getLightness($store.getters.current.secondary) < 50"
                            />
                        </v-col>
                    </v-row>
                    <v-expand-transition>
                        <v-row dense v-if="$store.getters.options.exp_showConsole">
                            <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                                <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">
                                    Console Grid
                                </v-subheader>
                            </v-col>
                            <v-col cols="12" md="8" class="pt-0 pb-0">
                                <v-switch
                                        :label="$vuetify.breakpoint.mdAndDown? 'Console Grid': ''"
                                        v-model="$store.getters.options.exp_consoleGrid"
                                        @change="localStorage.exp_consoleGrid = $store.getters.options.exp_consoleGrid"
                                        :color="$store.getters.current.active"
                                        :dark="getLightness($store.getters.current.secondary) < 50"
                                />
                            </v-col>
                        </v-row>
                    </v-expand-transition>
                    <v-row dense>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">
                                About Page
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-switch
                                    :label="$vuetify.breakpoint.mdAndDown? 'About Page': ''"
                                    v-model="$store.getters.options.exp_showAbout"
                                    @change="localStorage.exp_showAbout = $store.getters.options.exp_showAbout"
                                    :color="$store.getters.current.active"
                                    :dark="getLightness($store.getters.current.secondary) < 50"
                            />
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">
                                Client Settings
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-switch
                                    :label="$vuetify.breakpoint.mdAndDown? 'Client Settings': ''"
                                    v-model="$store.getters.options.exp_showClientSettings"
                                    @change="localStorage.exp_showClientSettings = $store.getters.options.exp_showClientSettings"
                                    :color="$store.getters.current.active"
                                    :dark="getLightness($store.getters.current.secondary) < 50"
                            />
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">
                                Connect Dashboard Graphs
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-switch
                                    :label="$vuetify.breakpoint.mdAndDown? 'Connect Dashboard Graphs': ''"
                                    v-model="$store.getters.options.exp_connectGraphs"
                                    @change="localStorage.exp_connectGraphs = $store.getters.options.exp_connectGraphs"
                                    :color="$store.getters.current.active"
                                    :dark="getLightness($store.getters.current.secondary) < 50"
                            />
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                            <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">
                                Show Graph Zoom Sliders
                            </v-subheader>
                        </v-col>
                        <v-col cols="12" md="8" class="pt-0 pb-0">
                            <v-switch
                                    :label="$vuetify.breakpoint.mdAndDown? 'Connect Dashboard Graphs': ''"
                                    v-model="$store.getters.options.exp_showSlider"
                                    @change="localStorage.exp_showSlider = $store.getters.options.exp_showSlider"
                                    :color="$store.getters.current.active"
                                    :dark="getLightness($store.getters.current.secondary) < 50"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-expand-transition>
        </v-container>
        <v-container v-if="$store.getters.options.exp_showClientSettings" fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                     class="pa-5 mt-3">
            <h3>Client Settings (Currently only for creating new settings)</h3>
            <div style="width: 100%; height: 1px;" :style="{backgroundColor: $store.getters.current.accent2}"
                 class="mt-2 mb-2"/>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Client Secret
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-text-field
                            v-model="configvals[0]"
                            :error-messages="configerrors[0]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Client Secret' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Client Host IP
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-text-field
                            v-model="configvals[1]"
                            :error-messages="configerrors[1]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Client Host IP' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Client Port
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-text-field
                            v-model="configvals[2]"
                            :error-messages="configerrors[2]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Client Port' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Shutdown
                        Wait Time
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="6" class="pt-0 pb-0">
                    <v-text-field
                            v-model="msw"
                            :error-messages="configerrors[3]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Max Shutdown Wait Time' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
                <v-col cols="4" md="2" class="pt-6 pb-0">
                    <span>{{mswtprev}}</span>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Threads
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                    <v-text-field
                            v-model="configvals[3]"
                            :error-messages="configerrors[4]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Max Threads' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Cache Size
                    </v-subheader>
                </v-col>
                <v-col cols="8" md="6" class="pt-0 pb-0">
                    <v-text-field
                            v-model="mcs"
                            :error-messages="configerrors[5]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Max Cache Size' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
                <v-col cols="4" md="2" class="pt-6 pb-0">
                    <span>{{mcsprev}}</span>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Hourly
                        Bandwith
                    </v-subheader>
                </v-col>
                <v-col cols="8" md="6" class="pt-0 pb-0">
                    <v-text-field
                            v-model="mhb"
                            :error-messages="configerrors[6]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Max Hourly Bandwith' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
                <v-col cols="4" md="2" class="pt-6 pb-0">
                    <span>{{mhbprev}}</span>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="4" class="pt-0 pb-0" v-if="!$vuetify.breakpoint.mdAndDown">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Max Burst Speed
                    </v-subheader>
                </v-col>
                <v-col cols="8" md="6" class="pt-0 pb-0">
                    <v-text-field
                            v-model="mbs"
                            :error-messages="configerrors[7]"
                            :label="$vuetify.breakpoint.mdAndDown ? 'Max Burst Speed' : ''"
                            :dark="getLightness($store.getters.current.secondary) < 50"
                            color="textColor"
                    />
                </v-col>
                <v-col cols="4" md="2" class="pt-6 pb-0">
                    <span>{{mbsprev}}</span>
                </v-col>
            </v-row>
            <v-container fluid>
                <h3>Config Result</h3>
                <v-container fluid
                             style="background-color: #000000; color: #fff">
                    <p style="font-family: monospace" class="mb-0">
                        {<br>
                        "client_secret": "{{configvals[0]}}",<br>
                        "client_hostname": "{{configvals[1]}}",<br>
                        "client_port": "{{configvals[2]}}",<br>
                        "threads": "{{configvals[3]}}",<br>
                        "graceful_shutdown_wait_seconds": "{{configvals[4]}}",<br>
                        "max_cache_size_in_mebibytes": "{{configvals[5]}}",<br>
                        "max_kilobits_per_second": "{{configvals[6]}}",<br>
                        "max_mebibytes_per_hour": "{{configvals[7]}}",<br>
                        }
                    </p>
                </v-container>
            </v-container>
        </v-container>
        <v-hover v-slot:default="{ hover }">
            <v-btn
                    small
                    tile
                    :elevation="hover || $store.getters.options.superSecret? 1 : 0"
                    style="z-index: 1000"
                    :style="{position: 'absolute', top:'18px', right: '18px',color: $store.getters.options.superSecret? $store.getters.current.textColor : $store.getters.current.secondary}"
                    @click="()=>{dosuperSecret() ; localStorage.superSecret = $store.getters.options.superSecret}"
                    :color="$store.getters.options.superSecret? $store.getters.current.accent : '#00000000'"
            >
                {{superSecretText}}
            </v-btn>
        </v-hover>
        <v-btn
                v-if="$store.getters.options.superSecret"
                small
                tile
                :elevation="1"
                style="z-index: 1000"
                :style="{position: 'absolute', top:'50px', right: '18px', color: $store.getters.options.superSecret ? $store.getters.current.textColor : $store.getters.current.secondary}"
                @click="() => {$store.commit('setOption', ['superSecret', false]); this.superSecretText = ''; localStorage.superSecret = $store.getters.options.superSecret}"
                :color="$store.getters.current.accent"
        >
            Close EXP options
        </v-btn>
    </v-container>
</template>

<script>
    import store from "../store/index";
    import {getLightness} from "@/constants";

    let secretText = [
        'AHHH!!!! YOU FOUND ME!!!',
        'You pushed it....',
        'I-It\'s not like i m-mind being p-p-pressed',
        'Your pointer is dirty :(',
        'How could you...',
        'Was I that bad at hiding?',
        'I hope you\'re not trying to find all the messages...',
        'What even is a button?',
        'Do buttons normally talk?',
        'I\'m different...',
        '↑ ↓ ↑ ↓ ← → ← → A B A B START',
        'I\'m a potato',
        'Heh... Made you click!',
        'PLUSSSSSS ULTRAAAAAAA!!!!!',
    ]

    export default {
        name: "Options",
        methods: {
            checkNan(val, index) {
                if (isNaN(val))
                    this.referr[index] = 'That is not a number!';
                else {
                    this.referr[index] = ''
                }
            },
            changetext() {
                let newt = secretText[Math.floor(Math.random() * secretText.length)]
                while (this.superSecretText === newt)
                    newt = secretText[Math.floor(Math.random() * secretText.length)]
                this.superSecretText = newt
            },
            dosuperSecret() {
                // if (this.superSecretClickCount < 2) {
                store.commit('setOption', ['superSecret', true])
                this.superSecret = true;
                if (store.getters.options.superSecret)
                    this.items = [{
                        disp: 'Light',
                        val: 'light'
                    }, {
                        disp: 'Dark',
                        val: 'dark'
                    }, {
                        disp: 'Midnight',
                        val: 'midnight'
                    }, {
                        disp: 'I want to die',
                        val: 'eyekiller'
                    }, {
                        disp: 'Custom',
                        val: 'custom',
                    }]
                this.changetext()
                // } else {
                //     this.superSecretClickCount--;
                //     this.superSecretText = this.superSecretClickCount
                // }
            },
            getLightness: (H) => getLightness(H),
            log: (H) => console.log(H),
        },
        mounted() {
            if (store.getters.options.current === 'custom' || store.getters.options.superSecret)
                this.items = [{
                    disp: 'Light',
                    val: 'light'
                }, {
                    disp: 'Dark',
                    val: 'dark'
                }, {
                    disp: 'Midnight',
                    val: 'midnight'
                }, {
                    disp: 'I want to die',
                    val: 'eyekiller'
                }, {
                    disp: 'Custom',
                    val: 'custom',
                }]
            if (store.getters.options.superSecret)
                this.changetext()
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
                }, {
                    disp: 'I want to die',
                    val: 'eyekiller'
                }],
                mcsprev: '1.049 mb',
                mcs: 1048576,
                mhbprev: '1.049 mb',
                mhb: 1048576,
                mbsprev: '1 kps',
                mbs: 1000,
                mswtprev: '1 m',
                msw: 60,
                configvals: ['iiesenpaithisisoursecret', '0.0.0.0', 44300, 16, 60, 1, 1, 1],
                configerrors: ['', '', '', '', '', '', '', ''],
                hasBgImage: store.getters.hasBgImage,
                bgimg: store.getters.bgImg,
                updateInterval: store.getters.data.updateInterval,
                maxpoints: store.getters.data.maxStorePoints,
                referr: ['', ''],
                showbar: store.getters.showAppBar,
                localStorage: localStorage,
                superSecretClickCount: 5,
                superSecret: false,
                // superSecretText: 'Super Secret Button Of Secrets',
                superSecretText: '',
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
            },
            maxbs() {
                return this.mbs
            },
            maxhb() {
                return this.mhb
            },
            maxcs() {
                return this.mcs
            },
            maxsw() {
                return this.msw
            },
            configval() {
                return this.configvals
            },
            custbg() {
                return store.getters.themes.custom.backgroundColor
            }
        },
        watch: {
            hasbg() {
                this.hasBgImage = store.getters.hasBgImage;
            },
            bgurl() {
                this.bgimg = store.getters.bgImg;
            },
            showAppBar() {

            },
            maxbs() {
                if (this.mbs === '') {
                    this.mbsprev = '0 bits/s';
                    return;
                }
                let unit = ['bps', 'kbps', 'mbps', 'gbps', 'tbps', 'pbps', 'ebps', 'zbps', 'ybps'];
                if (isNaN(this.mbs)) {
                    for (let i in unit) {
                        if (this.mbs.indexOf(unit[i]) !== -1) {
                            let val = parseFloat(this.mbs.replace(unit[i], ''));
                            for (let j in unit) {
                                let divisor = Math.pow(10, parseInt(j) * 3)
                                if (val * Math.pow(10, parseInt(i) * 3) >= divisor)
                                    this.mbsprev = (val * Math.pow(10, parseInt(i) * 3) / divisor).toPrecision(4) + ' ' + unit[j]
                            }
                            this.configvals[6] = val * Math.pow(10, parseInt(i) * 3) / 1000;
                        }
                    }
                } else {
                    let bits = parseInt(this.mbs);
                    for (let i in unit) {
                        let divisor = Math.pow(10, parseInt(i) * 3)
                        if (bits >= divisor)
                            this.mbsprev = (bits / divisor).toPrecision(4) + ' ' + unit[i]
                    }
                    this.configvals[6] = Math.round(bits / 1000);
                }
                if (this.configvals[6] < 1) {
                    this.configerrors[7] = 'That size is too small!';
                } else
                    this.configerrors[7] = ''
            },
            maxhb() {
                if (this.mcs === '') {
                    this.configvals[7] = 0;
                    this.mcsprev = '0 bytes';
                    return;
                }
                let unit = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
                if (isNaN(this.mhb)) {
                    for (let i in unit) {
                        if (this.mhb.indexOf(unit[i]) !== -1) {
                            let val = parseFloat(this.mhb.replace(unit[i], ''));
                            for (let j in unit) {
                                let divisor = Math.pow(10, parseInt(j) * 3)
                                if (val * Math.pow(10, parseInt(i) * 3) >= divisor)
                                    this.mhbprev = (val * Math.pow(10, parseInt(i) * 3) / divisor).toPrecision(4) + ' ' + unit[j]
                            }
                            this.configvals[7] = Math.round(val * Math.pow(10, parseInt(i) * 3) / 1048576);
                        }
                    }
                } else {
                    let bytes = parseInt(this.mhb);
                    if (bytes === 0) {
                        this.mhbprev = '0 bytes';
                        return;
                    }
                    for (let i in unit) {
                        let divisor = Math.pow(10, parseInt(i) * 3)
                        if (bytes >= divisor)
                            this.mhbprev = (bytes / divisor).toPrecision(4) + ' ' + unit[i]
                    }
                    this.configvals[7] = Math.round(bytes / 1048576);
                }
                if (this.configvals[7] < 1) {
                    this.configerrors[6] = 'That size is too small!';
                } else
                    this.configerrors[6] = ''
            },
            maxcs() {
                if (this.mcs === '') {
                    this.configvals[5] = 0;
                    this.mcsprev = '0 bytes';
                    return;
                }
                let unit = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
                if (isNaN(this.mcs)) {
                    for (let i in unit) {
                        if (this.mcs.indexOf(unit[i]) !== -1) {
                            let val = parseFloat(this.mcs.replace(unit[i], ''));
                            for (let j in unit) {
                                let divisor = Math.pow(10, parseInt(j) * 3)
                                if (val * Math.pow(10, parseInt(i) * 3) >= divisor)
                                    this.mcsprev = (val * Math.pow(10, parseInt(i) * 3) / divisor).toPrecision(4) + ' ' + unit[j]
                            }
                            this.configvals[5] = Math.round(val * Math.pow(10, parseInt(i) * 3) / 1048576);
                        }
                    }
                } else {
                    let bytes = parseInt(this.mcs);
                    for (let i in unit) {
                        let divisor = Math.pow(10, parseInt(i) * 3)
                        if (bytes >= divisor)
                            this.mcsprev = (bytes / divisor).toPrecision(4) + ' ' + unit[i]
                    }
                    this.configvals[5] = Math.round(bytes / 1048576);
                }
                if (this.configvals[5] < 1) {
                    this.configerrors[5] = 'That size is too small!';
                } else
                    this.configerrors[5] = ''
            },
            maxsw() {
                if (this.msw === '') {
                    this.configvals[4] = 0;
                    this.mswtprev = '0 seconds';
                    return;
                }
                let unit = ['s', 'm', 'h', 'd'];
                let conversion = [1, 60, 3600, 86400]
                if (isNaN(this.msw)) {
                    for (let i in unit) {
                        if (this.msw.indexOf(unit[i]) !== -1) {
                            let val = parseFloat(this.msw.replace(unit[i], ''));
                            for (let j in conversion) {
                                let divisor = conversion[j]
                                if (val * conversion[i] >= divisor) {
                                    this.mswtprev = (val * conversion[i] / divisor).toPrecision(4) + ' ' + unit[j]
                                }
                            }
                            this.configvals[4] = Math.round(val * conversion[i]);
                        }
                    }
                } else {
                    let time = parseInt(this.msw);
                    for (let i in conversion) {
                        let divisor = conversion[i]
                        if (time >= divisor) {
                            this.mswtprev = (time / divisor).toPrecision(4) + ' ' + unit[i]
                        }
                    }
                    this.configvals[4] = Math.round(time);
                }
            },
            configval() {
                if (this.configval[0].indexOf(' ') !== -1) {
                    this.configerrors[0] = 'Secret can\'t have spaces!'
                } else {
                    this.configerrors[0] = ''
                }
                if (this.configval[1].indexOf(' ') !== -1) {
                    this.configerrors[1] = 'IP can\'t have spaces!'
                } else {
                    this.configerrors[1] = ''
                }
                if (isNaN(this.configval[2])) {
                    this.configerrors[2] = 'Port can\'t have spaces!'
                } else {
                    this.configerrors[2] = ''
                }
                if (this.configval[3] < 4) {
                    this.configerrors[4] = 'Max threads can\'t be less than 4!'
                } else if (isNaN(this.configval[3]))
                    this.configerrors[4] = 'Max threads should be a number!'
                else {
                    this.configerrors[4] = ''
                }
            },
            custbg() {
                document.body.style.backgroundColor = store.getters.current.backgroundColor;
            }
        }
    }
</script>

<style>
    .v-select__selection--comma {
        color: inherit !important;
    }

    .v-input {
        color: inherit !important;
        caret-color: inherit !important;
    }

    .v-input input {
        color: inherit !important;
        caret-color: inherit !important;
    }

    .v-icon {
        color: inherit !important;
    }

    .v-color-picker span {
        color: inherit !important;
    }

    .v-color-picker__input > input {
        color: inherit !important;
        border-color: inherit !important;
    }
</style>