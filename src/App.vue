<template>
    <v-app :style="{background: $store.getters.current.backgroundColor}">
        <v-app-bar
                app
                :style="{background: $store.getters.current.primary}"
                clipped-left
        >
            <div class="d-flex">
                <v-img
                        alt="MD Logo"
                        class="shrink mr-4"
                        contain
                        src="https://mangadex.org/images/misc/navbar.svg?3"
                        transition="scale-transition"
                        width="60"
                />
                <h1 :style="{color: $store.getters.current.textColor}">MD@Home Client Interface</h1>
            </div>
            <v-spacer></v-spacer>
            <!--            <v-btn-->
            <!--                    href=""-->
            <!--                    target="_blank"-->
            <!--                    text-->
            <!--            >-->
            <!--                <span class="mr-2"></span>-->
            <!--            </v-btn>-->
        </v-app-bar>
        <v-navigation-drawer
                :style="{background: $store.getters.current.primary}"
                :expand-on-hover="true"
                :mini-variant="true"
                :permanent="true"
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
                        <v-list-item-title :style="{color: $store.getters.current.textColor}">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <v-container fluid pd-0>
                <transition name="fade">
                    <router-view/>
                </transition>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    // import dash from './components/Dashboard';
    export default {
        name: 'App',
        components: {}, data() {
            return {
                items: [
                    {title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dash'},
                    {title: 'Console', icon: 'mdi-console', route: '/cons'},
                    {title: 'Settings', icon: 'mdi-cog-outline', route: '/opts'},
                    {title: 'About', icon: 'mdi-information-outline', route: '/info'},
                ]
            }
        },
    };
</script>
