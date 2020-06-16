<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1>Settings</h1>
        </v-container>
        <v-select
                :items="items"
                item-value="val"
                item-text="disp"
                @input="setTheme"
                :value="$store.state.current"
                :color="$store.getters.current.textColor"
                :dark="$store.getters.current.isDark"
        >
        </v-select>
        <h2>Ignore this lazy information header</h2>
        <p>The theme updates live, but wont change graph colors.<br>Reloading will solve this issue</p>
    </v-container>
</template>

<script>
    import store from "../store/index";

    if (localStorage.theme) {
        store.commit('setTheme', localStorage.theme);
        document.body.style.backgroundColor = store.getters.current.backgroundColor;
    }
    export default {
        name: "Options",
        methods: {
            setTheme(newt) {
                store.state.current = newt;
                localStorage.theme = newt;
                store.commit('setTheme', newt);
                document.body.style.backgroundColor = store.getters.current.backgroundColor;
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
            }
        },

    }
</script>

<style>
</style>