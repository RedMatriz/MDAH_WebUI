<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid class="pt-0 pb-0"
                     :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
            <v-row>
                <v-col>
                    <h1 class="pl-1">Console</h1>
                </v-col>
                <v-col>
                    <v-btn
                            :style="{color: $store.getters.current.textColor}"
                            :color="$store.getters.current.accent1"
                            tile
                            style="position: absolute; right: 0;margin-right: 28px; margin-top: 5px"
                    >Disconnected
                    </v-btn>
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