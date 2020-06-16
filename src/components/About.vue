<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1>Info</h1>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>