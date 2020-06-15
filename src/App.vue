<template>
    <v-app :style="{background: $store.getters.current.backgroundColor}">
        <v-app-bar
                app
                :style="{background: $store.getters.current.primary}"
                :clipped-left="$vuetify.breakpoint.mdAndUp"
                :hide-on-scroll="!$vuetify.breakpoint.mdAndUp"
        >
            <v-app-bar-nav-icon
                    class="hidden-md-and-up"
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
                    :hidden="!$vuetify.breakpoint.mdAndUp"
            />
            <h1 :style="{color: $store.getters.current.textColor}" class="hidden-sm-and-down">MD@Home Client
                Interface</h1>
            <h1 :style="{color: $store.getters.current.textColor}" class="hidden-md-and-up">MD@H Client</h1>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                :style="{background: $store.getters.current.primary}"
                :expand-on-hover="$vuetify.breakpoint.mdAndUp"
                :mini-variant="$vuetify.breakpoint.mdAndUp"
                :permanent="$vuetify.breakpoint.mdAndUp"
                app
                clipped
                floating
        >
            <v-list
                    dense
                    nav
                    class="pt-2"
                    v-bind:dark="$store.getters.current.isDark"
            >
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon :style="{color: $store.getters.current.textColor}">mdi-format-list-bulleted</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title :style="{color: $store.getters.current.textColor}">Menu</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider/>
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
        <v-main>
            <transition name="fade">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </transition>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {}, data() {
            return {
                drawer: null,
                settings: 'settings',
                items: [
                    {title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dash'},
                    {title: 'Console', icon: 'mdi-console', route: '/cons'},
                    {title: 'Settings', icon: 'mdi-cog-outline', route: '/opts'},
                    {title: 'About', icon: 'mdi-information-outline', route: '/info'},
                ]
            }
        }
    };
</script>
