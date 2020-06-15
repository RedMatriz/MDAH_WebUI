<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <h1>Settings</h1>
        <v-select
                :items="items"
                item-value="val"
                item-text="disp"
                @input="setTheme"
                :color="$store.getters.current.textColor"
                :dark="$store.getters.current.isDark"
        >
        </v-select>
    </v-container>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: "Options",
        methods: {
            ...mapMutations([
                'setTheme'
            ]),
        },
        data() {
            return {
                items: [{disp: 'Light', val: 'light'}, {disp: 'Dark', val: 'dark'}, {disp: 'Midnight', val: 'midnight'}]
            }
        }
    }
</script>

<style scoped>

</style>