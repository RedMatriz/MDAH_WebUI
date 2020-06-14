<template>
    <v-app class="primary">
        <v-app-bar
                app
                flat
                color="primary"
                class="accent--text"
        >
            <div class="d-flex">
                <v-img
                        alt="MD Logo"
                        class="shrink ml-0"
                        contain
                        src="https://mangadex.org/images/misc/navbar.svg?3"
                        transition="scale-transition"
                        width="40"
                />
<!--                <v-img-->
<!--                        alt="MD Logo"-->
<!--                        contain-->
<!--                        src="https://mangadex.org/images/misc/navbar.svg?3"-->
<!--                        transition="scale-transition"-->
<!--                        width="40"-->
<!--                    />-->
                <h1>MD@Home Client Interface</h1>
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
        <v-content>
            <v-navigation-drawer
                    color="primary"
                    :expand-on-hover="true"
                    :mini-variant="true"
                    :right="false"
                    :permanent="true"
                    absolute
            >
                <v-list
                        dense
                        nav
                        class="py-0"
                >
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="accent">mdi-format-list-bulleted</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="accent--text">Menu</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            :to="{path: item.route}"
                            link
                    >
                        <v-list-item-icon>
                            <v-icon color="accent">{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="accent--text">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-container fluid pd-0 style="margin-left: 56px; width: calc(100% - 56px)">
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
