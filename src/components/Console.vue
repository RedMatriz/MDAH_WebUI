<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <h1>Console</h1>
    </v-container>
</template>

<script>
    export default {
        name: "Console"
    }
</script>

<style scoped>

</style>