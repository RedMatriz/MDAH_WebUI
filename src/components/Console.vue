<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}" style="height: 100%">
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
        <v-container fluid class="pa-0 mt-3">
            <xterm style="width: 100%;" class="mb-3"/>
        </v-container>
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}" class="pa-0 mt-3">
            <v-row>
                <v-col>
                    <h3>Some Buttons</h3>
                </v-col>
                <v-col>
                    <h3>Some Buttons</h3>
                </v-col>
                <v-col>
                    <h3>Some Buttons</h3>
                </v-col>
                <v-col>
                    <h3>Some Buttons</h3>
                </v-col>
                <v-col>
                    <h3>Some Buttons</h3>
                </v-col>
            </v-row>
        </v-container>

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