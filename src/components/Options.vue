<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1 class="pl-1">Settings</h1>
        </v-container>
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                     class="pa-5 pb-9 mt-3">
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
                            @input="(val) => $store.commit('setTheme', val)"
                            :value="$store.state.options.current"
                            :color="$store.getters.current.textColor"
                            :dark="$store.getters.current.isDark"
                    />
                </v-col>
            </v-row>
            <v-row dense v-if="!$vuetify.breakpoint.mdAndDown">
                <v-col cols="4" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-5">Show App Bar
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-0 pb-0">
                        <v-switch
                                v-model="showbar"
                                @change="$store.commit('showAppBar', showbar)"
                                :dark="$store.getters.current.isDark"
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
                                :dark="$store.getters.current.isDark"
                        />
                </v-col>
            </v-row>
            <v-expand-transition>
            <v-row dense v-if="hasBgImage">
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
            </v-expand-transition>
            <v-row dense>
                <v-col cols="4" v-if="!$vuetify.breakpoint.mdAndDown" class="pt-0 pb-0">
                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pt-3">Dashboard
                    </v-subheader>
                </v-col>
                <v-col cols="12" md="8" class="pt-2 pb-0">
                        <v-btn
                                @click="$store.commit('resetLayout')"
                                :style="{color: $store.getters.current.textColor}"
                                :color="$store.getters.current.accent1"
                                v-if="!$vuetify.breakpoint.mdAndDown"
                        >
                            Reset
                        </v-btn>
                    <v-btn
                            @click="$store.commit('resetLayout')"
                           :style="{color: $store.getters.current.textColor}"
                           :color="$store.getters.current.accent1"
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
                <v-col cols="8" class="pt-0 pb-0">
                    <v-text-field
                            :label="$vuetify.breakpoint.mdAndDown? 'Data Refresh Rate': ''"
                            v-model="updateInterval"
                            :dark="$store.getters.current.isDark"
                            :error-messages="referr[0]"
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
                <v-col cols="8" class="pt-0 pb-0">
                    <v-text-field
                            :label="$vuetify.breakpoint.mdAndDown? 'Max Data Points': ''"
                            v-model="maxpoints"
                            :dark="$store.getters.current.isDark"
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
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
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
                            :dark="$store.getters.current.isDark"
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
                            :dark="$store.getters.current.isDark"
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
                            :dark="$store.getters.current.isDark"
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
                            :dark="$store.getters.current.isDark"
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
                            :dark="$store.getters.current.isDark"
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
                            :dark="$store.getters.current.isDark"
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
                            :dark="$store.getters.current.isDark"
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
                            :dark="$store.getters.current.isDark"
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
    </v-container>
</template>

<script>
    import store from "../store/index";

    export default {
        name: "Options",
        methods: {
            checkNan(val, index) {
                if (isNaN(val))
                    this.referr[index] = 'That is not a number!';
                else {
                    this.referr[index] = ''
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
                referr: ['',''],
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
            }
        }
    }
</script>

<style>
</style>