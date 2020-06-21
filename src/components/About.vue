<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1 class="pl-1">Info</h1>
        </v-container>
        <p>
            You shouldn't be here
        </p>
        <v-img src="https://i.kym-cdn.com/photos/images/newsfeed/001/273/780/f05.png">
        </v-img>
    </v-container>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>