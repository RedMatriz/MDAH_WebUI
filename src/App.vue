<template>
    <v-app style="background: rgba(0,0,0,0)">
        <v-app-bar
                :app="$store.getters.showAppBar"
                :style="{background: $store.getters.current.primary + $store.getters.alpha}"
                :clipped-left="!$vuetify.breakpoint.mdAndDown"
                :hide-on-scroll="$vuetify.breakpoint.mdAndDown"
                floating
                :hidden="!$vuetify.breakpoint.mdAndDown && !$store.getters.showAppBar"
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
                        <v-icon :style="{color: $store.getters.current.textColor}">mdi-format-list-bulleted</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title :style="{color: $store.getters.current.textColor}">Menu
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
                        <v-icon :style="{color: $store.getters.current.textColor}">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title :style="{color: $store.getters.current.textColor}">{{ item.title }}
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
            <transition name="fade">
                <router-view/>
            </transition>
        </v-main>
    </v-app>
</template>

<script>
    import store from "@/store";

    let clock;
    export default {
        name: 'App',
        timers: {},
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
        mounted() {
            fetch("api/pastStats")
                .then(response => response.json())
                .then(response => {
                    response.forEach((k) => store.commit('pushStats', JSON.parse('{' + k + ': ' + JSON.stringify(response[k]) + '}')));
                }).catch((err) => console.log(err));
            this.sortData();
            this.loadData();
            clock = setInterval(() => {
                this.updateData();
            }, isNaN(store.getters.data.updateInterval) ? 500 : Math.max(store.getters.data.updateInterval, 500))
        },
        computed: {
            refresh() {
                return store.getters.data.updateInterval;
            }
        },
        watch: {
            refresh() {
                clearInterval(clock);
                clock = setInterval(() => {
                    this.updateData();
                }, isNaN(store.getters.data.updateInterval) ? 500 : Math.max(store.getters.data.updateInterval, 500))
            }
        }
    }
</script>
<style>
</style>