<template>
    <v-app style="background: rgba(0,0,0,0);">
        <v-app-bar
                app
                :style="{background: $store.getters.current.primary + $store.getters.alpha}"
                :clipped-left="!$vuetify.breakpoint.mdAndDown"
                :hide-on-scroll="$vuetify.breakpoint.mdAndDown"
                floating
                v-if="$vuetify.breakpoint.mdAndDown || $store.getters.showAppBar"
        >
            <v-app-bar-nav-icon
                    class="hidden-lg-and-up"
                    :style="{color: $store.getters.current.textColor}"
                    @click.stop="drawer = !drawer"
            />
            <v-img
                    alt="MD Logo"
                    class="shrink mr-4"
                    contain
                    src="https://mangadex.org/images/misc/navbar.svg?3"
                    transition="scale-transition"
                    width="60"
            />
            <h1 :style="{color: $store.getters.current.textColor}" class="hidden-sm-and-down">MD@Home Client
                Interface</h1>
            <h2 :style="{color: $store.getters.current.textColor}" class="hidden-md-and-up">MD@H Client</h2>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                :style="{background: $store.getters.current.primary + $store.getters.alpha}"
                :expand-on-hover="!$vuetify.breakpoint.mdAndDown"
                :mini-variant="!$vuetify.breakpoint.mdAndDown"
                :permanent="!$vuetify.breakpoint.mdAndDown"
                app
                :clipped="$store.getters.showAppBar"
                floating
        >
            <v-list
                    dense
                    nav
                    class="pt-2"
                    :dark="$store.getters.current.isDark"
            >
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon :style="{color: $store.getters.current.textColor  + '!important'}">mdi-format-list-bulleted</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title :style="{color: $store.getters.current.textColor  + '!important'}">Menu
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <div style="width: 100%; height: 1px;" :style="{backgroundColor: $store.getters.current.accent2}"/>
                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        :to="{path: item.route}"
                        link
                        class="mt-1"
                >
                    <v-list-item-icon>
                        <v-icon :style="{color: $store.getters.current.textColor + '!important'}">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title :style="{color: $store.getters.current.textColor + '!important'}">{{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-img
                v-if="$store.getters.hasBgImage"
                :src="$store.getters.bgImg"
                :style="{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                }"
        />
        <v-main>
            <v-fade-transition>
                <overlay-scrollbars
                        v-if="!$vuetify.breakpoint.mdAndDown"
                        :options="{className: $store.getters.current.isDark ? 'os-theme-light' :'os-theme-dark', paddingAbsolute: true, scrollbars: { autoHide: 'scroll' }}"
                        style="height: 100%">
                    <router-view/>
                </overlay-scrollbars>
                <router-view v-if="$vuetify.breakpoint.mdAndDown"/>
            </v-fade-transition>
        </v-main>
    </v-app>

</template>

<script>
    import store from "@/store";
    import vuetify from '@/plugins/vuetify'
    import {getLightness} from "@/constants";

    export default {
        name: 'App',
        timers: {
            pullData: {time: store.getters.data.updateInterval, autostart: true, repeat: true}
        },
        data() {
            return {
                drawer: null,
                items: [
                    {title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'},
                    {title: 'Console', icon: 'mdi-console', route: '/cons'},
                    {title: 'Settings', icon: 'mdi-cog-outline', route: '/opts'},
                    {title: 'Client Info', icon: 'mdi-information-outline', route: '/info'},
                ],
            }
        },
        methods: {
            pullData() {
                // let list = [
                //     'Upstream query for TESTDATA errored with status TESTDATA',
                //     'Upstream query for TESTDATA succeeded',
                //     'Request for TESTDATA missed cache',
                //     'Request for TESTDATA hit cache',
                //     'Request for TESTDATA is being served',
                //     'Request for TESTDATA is being cached and served',
                //     'Cache download for TESTDATA committed',
                //     'Cache download for TESTDATA aborted',
                //     'Cache go/no go for TESTDATA failed'
                // ]
                // let levels = [
                //     'ERROR',
                //     'WARN ',
                //     'DEBUG',
                //     'INFO ',
                //     'TRACE'
                // ]
                // store.commit('pushConsoleLine',moment(moment.now()).format('YYYY-MM-DD hh:mm:ss') + ' ' + levels[Math.floor(Math.random() * levels.length)] + ' ' + list[Math.floor(Math.random() * list.length)])
                this.updateData();
            },
            updateNav(){
                let temp = [{title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'}]
                if (store.getters.options.exp_showConsole)
                    temp.push({title: 'Console', icon: 'mdi-console', route: '/cons'})
                temp.push({title: 'Settings', icon: 'mdi-cog-outline', route: '/opts'})
                if (store.getters.options.exp_showAbout)
                    temp.push({title: 'Client Info', icon: 'mdi-information-outline', route: '/info'})
                this.items = temp
            }
        },
        mounted() {
            document.body.style.backgroundColor = store.getters.current.backgroundColor;
            vuetify.framework.theme.dark = getLightness(store.getters.current.secondary) < 50
            this.timers.pullData.time = store.getters.data.updateInterval
            this.$timer.restart('pullData')
            this.updateNav()
        },
        computed: {
            refresh() {
                return store.getters.data.updateInterval;
            },
            console(){
                return store.getters.options.exp_showConsole
            },
            about(){
                return store.getters.options.exp_showAbout;
            }
        },
        watch: {
            refresh() {
                this.timers.pullData.time = store.getters.data.updateInterval
                this.$timer.restart('pullData')
            },
            console(){
                this.updateNav()
            },
            about(){
                this.updateNav()
            }
        }
    }
</script>
<style>
</style>