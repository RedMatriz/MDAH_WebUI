<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <h1 class="pl-1">Console</h1>
        </v-container>
        <v-container fluid class="mt-3"
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <v-row>
                <v-col cols="3">
                    <h3 style="position: absolute">Client Status:</h3>
                    <v-btn small style="margin-left: 130px">Disconnected</v-btn>
                </v-col>
                <v-col>

                </v-col>
            </v-row>

        </v-container>
        <xterm style="width: calc(100% - 24px); bottom: 0; position: absolute" class="mt-3 mb-3"></xterm>
    </v-container>
</template>

<script>
    import Xterm from "@/components/xterm";

    export default {
        name: "Console",
        components: {Xterm},
    }
</script>

<style scoped>

</style>