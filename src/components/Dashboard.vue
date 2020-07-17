<template>
    <v-container fluid :style="{color: $store.getters.current.textColor}">
        <v-container fluid :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}"
                     class="pt-0 pb-0">
            <v-row>
                <v-col>
                    <h1 class="pl-1">Dashboard</h1>
                </v-col>
                <v-col>
                    <v-btn
                            v-if="!$vuetify.breakpoint.mdAndDown"
                            :style="{color: $store.getters.current.textColor}"
                            style="position: absolute; right: 0;margin-right: 28px; margin-top: 5px"
                            :color="$store.getters.current.accent"
                            tile
                            @click="showModal"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        Add Graph
                    </v-btn>
                    <v-btn
                            v-if="$vuetify.breakpoint.mdAndDown"
                            :style="{color: $store.getters.current.textColor}"
                            style="position: absolute; right: 0;margin-right: 28px; margin-top: 5px"
                            :color="$store.getters.current.accent"
                            tile
                            @click="showModal"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <div ref="grid" style="position:relative; width: calc(100% + 24px); left: -12px"
             v-if="!$vuetify.breakpoint.smAndDown"></div>
        <v-row v-if="$vuetify.breakpoint.smAndDown">
            <v-col cols="12" v-for="(item, index) in $store.getters.layout.charts" class="pb-0" :key="index">
                <v-container fluid style="height: 300px;width: 100%; position: relative"
                             :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
                    <chart style="height: 100%;width: 100%" autoresize
                           :options="item"/>
                    <v-icon :style="{position: 'absolute', color: store.getters.current.textColor  + '!important', top: '2px', right: '2px'}"
                            dense small
                            @click="$store.commit('removeLayoutContainer', index)"
                    >mdi-close
                    </v-icon>
                </v-container>
            </v-col>
        </v-row>
        <div>
            <modal name="createGraph"
                   :styles="{backgroundColor: $store.getters.current.secondary, minHeight: '75%'}"
                   :width="$vuetify.breakpoint.smAndDown ? '100%' : '90%'"
                   height="auto"
                   :scrollable="true"
            >
                <v-container fluid>
                    <h3>Create Graph</h3>
                    <v-btn absolute style="right: 12px; top: 12px" small icon @click="$modal.hide('createGraph')"
                           :color="$store.getters.current.textColor">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <div style="width: 100%; height: 1px;" :style="{backgroundColor: $store.getters.current.accent2}"
                         class="mt-2 mb-2"/>
                    <v-row :class="$vuetify.breakpoint.mdAndDown ? 'mb-12' : ''">
                        <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 4" style="position: relative">
                            <chart v-if="$vuetify.breakpoint.mdAndDown"
                                   :key="prevreload"
                                   autoresize
                                   style="width: 100%"
                                   :options="$store.getters.layout.tempoptions"
                            />
                            <v-row dense class="mr-3">
                                <v-col cols="3" class="pa-0">
                                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pl-2">
                                        Title
                                    </v-subheader>
                                </v-col>
                                <v-col cols="9" class="pa-0 pl-1">
                                    <v-text-field
                                            v-if="graph"
                                            class="pt-1"
                                            dense
                                            v-model="$store.getters.layout.tempoptions.title.text"
                                            color="textColor"
                                            :dark="getLightness($store.getters.current.secondary) < 50"
                                    />
                                    <v-text-field
                                            v-if="!graph"
                                            class="pt-1"
                                            dense
                                            v-model="$store.getters.layout.temppieoptions.title.text"
                                            color="textColor"
                                            :dark="getLightness($store.getters.current.secondary) < 50"
                                    />
                                </v-col>
                            </v-row>
                            <v-row dense class="mr-3">
                                <v-col cols="3" class="pa-0">
                                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pl-2">
                                        Legend
                                    </v-subheader>
                                </v-col>
                                <v-col cols="9" class="pa-0">
                                    <v-checkbox
                                            v-if="graph"
                                            class="mt-2"
                                            :color="$store.getters.current.accent2"
                                            v-model="$store.getters.layout.tempoptions.legend.show"
                                            :value="true"
                                            dense
                                    />
                                    <v-checkbox
                                            v-if="!graph"
                                            class="mt-2"
                                            :color="$store.getters.current.accent2"
                                            v-model="$store.getters.layout.temppieoptions.legend.show"
                                            :value="true"
                                            dense
                                    />
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="3" class="pa-0">
                                    <v-subheader :style="{color: $store.getters.current.textColor}" class="pl-2">
                                        Type
                                    </v-subheader>
                                </v-col>
                                <v-col cols="9" class="pl-0">
                                    <v-btn-toggle
                                            class="mt-2"
                                            dense
                                            mandatory
                                            tile
                                            :dark="getLightness($store.getters.current.secondary) < 50"
                                    >
                                        <v-btn
                                                v-model="graph"
                                                :style="{color: $store.getters.current.textColor}"
                                                :color="$store.getters.current.accent"
                                                small>
                                            Graph
                                        </v-btn>
                                        <v-btn :style="{color: $store.getters.current.textColor}"
                                               :color="$store.getters.current.accent"
                                               small>
                                            Pie
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                            <v-fade-transition leave-absolute hide-on-leave>
                                <div v-if="graph">
                                    <v-btn
                                            style="width: 100%; height: 14px; padding-top: 2px; padding-bottom: 2px"
                                            :style="{color: $store.getters.current.textColor}"
                                            :color="$store.getters.current.accent"
                                            elevation="0"
                                            class="mt-2"
                                            tile
                                            small
                                            @click="() => this.showyaxis = !this.showyaxis"
                                    >
                                        <v-icon v-if="showyaxis">mdi-chevron-up</v-icon>
                                        <v-icon v-if="!showyaxis">mdi-chevron-down</v-icon>
                                        Y-axis
                                    </v-btn>
                                    <v-expand-transition>
                                        <div v-if="showyaxis">
                                            <div v-for="(line, index) in $store.getters.layout.tempoptions.yAxis"
                                                 :key="index" :class="$vuetify.breakpoint.mdAndDown ? 'mt-3' : 'mt-1'">
                                                <div v-if="index > 0" style="width: 100%; height: 1px;"
                                                     :style="{backgroundColor: $store.getters.current.accent2}"
                                                     class="mt-2 mb-2"/>
                                                <v-row dense class="mr-3">
                                                    <v-col cols="2" class="pa-0">
                                                        <v-btn
                                                                class="mt-2"
                                                                small
                                                                icon
                                                                :style="{color: $store.getters.current.textColor}"
                                                                :color="$store.getters.current.accent"
                                                                @click="addAxis(index)"
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-btn>
                                                        <v-btn
                                                                class="mt-2"
                                                                small
                                                                icon
                                                                v-if="$store.getters.layout.tempoptions.yAxis.length > 1"
                                                                :style="{color: $store.getters.current.textColor}"
                                                                :color="$store.getters.current.accent"
                                                                @click="removeAxis(index)"
                                                        >
                                                            <v-icon>mdi-minus</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col class="pa-0">
                                                        <v-row dense>
                                                            <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4"
                                                                   class="pa-0">
                                                                <v-subheader
                                                                        :style="{color: $store.getters.current.textColor}"
                                                                        class="pl-1">
                                                                    Name
                                                                </v-subheader>
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8"
                                                                   class="pa-0">
                                                                <v-text-field
                                                                        :label="$vuetify.breakpoint.mdAndDown ? 'Name' : ''"
                                                                        style="padding-top: 6px"
                                                                        dense
                                                                        v-model="line.name"
                                                                        color="textColor"
                                                                        :dark="getLightness($store.getters.current.secondary) < 50"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row dense>
                                                            <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4"
                                                                   class="pa-0">
                                                                <v-subheader
                                                                        :style="{color: $store.getters.current.textColor}"
                                                                        class="pl-1">
                                                                    Units
                                                                </v-subheader>
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8"
                                                                   class="pa-0">
                                                                <v-select
                                                                        :label="$vuetify.breakpoint.mdAndDown ? 'Units' : ''"
                                                                        style="padding-top: 6px"
                                                                        dense
                                                                        :items="units"
                                                                        :value="line.axisLabel ? line.axisLabel.unit : 0"
                                                                        item-text="name"
                                                                        item-value="idx"
                                                                        item-color="active"
                                                                        color="textColor"
                                                                        :dark="getLightness($store.getters.current.secondary) < 50"
                                                                        @change="(x) => setYAxisUnits(x, index)"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </div>
                                    </v-expand-transition>
                                    <v-btn
                                            style="width: 100%; height: 14px; padding-top: 2px; padding-bottom: 2px"
                                            :style="{color: $store.getters.current.textColor}"
                                            :color="$store.getters.current.accent"
                                            elevation="0"
                                            class="mt-2"
                                            tile
                                            small
                                            @click="() => this.showdatasets = !this.showdatasets"
                                    >
                                        <v-icon v-if="showdatasets">mdi-chevron-up</v-icon>
                                        <v-icon v-if="!showdatasets">mdi-chevron-down</v-icon>
                                        Datasets
                                    </v-btn>
                                    <v-expand-transition>
                                        <div v-if="showdatasets">
                                            <div v-for="(line, index) in $store.getters.layout.tempoptions.series"
                                                 :key="index" :class="$vuetify.breakpoint.mdAndDown ? 'mt-3' : 'mt-1'">
                                                <div v-if="index > 0" style="width: 100%; height: 1px;"
                                                     :style="{backgroundColor: $store.getters.current.accent2}"
                                                     class="mt-2 mb-2"/>
                                                <v-row dense class="mr-3">
                                                    <v-col cols="2" class="pa-0">
                                                        <v-btn
                                                                small
                                                                icon
                                                                :style="{color: $store.getters.current.textColor, marginTop: '10px'}"
                                                                :color="$store.getters.current.accent"
                                                                @click="addSet(index)"
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-btn>
                                                        <v-btn
                                                                small
                                                                icon
                                                                v-if="$store.getters.layout.tempoptions.series.length > 1"
                                                                :style="{color: $store.getters.current.textColor, marginTop: '10px'}"
                                                                :color="$store.getters.current.accent"
                                                                @click="removeSet(index)"
                                                        >
                                                            <v-icon>mdi-minus</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col class="pa-0">
                                                        <v-row dense>
                                                            <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4"
                                                                   class="pa-0">
                                                                <v-subheader
                                                                        :style="{color: $store.getters.current.textColor}"
                                                                        class="pl-1">
                                                                    Name
                                                                </v-subheader>
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8"
                                                                   class="pa-0">
                                                                <v-text-field
                                                                        :label="$vuetify.breakpoint.mdAndDown ? 'Name' : ''"
                                                                        style="padding-top: 6px"
                                                                        dense
                                                                        v-model="line.name"
                                                                        @input="(a) => $store.getters.layout.tempoptions.legend.data[index] = a"
                                                                        color="textColor"
                                                                        :dark="getLightness($store.getters.current.secondary) < 50"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row dense>
                                                            <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4"
                                                                   class="pa-0">
                                                                <v-subheader
                                                                        :style="{color: $store.getters.current.textColor}"
                                                                        class="pl-1">
                                                                    Type
                                                                </v-subheader>
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8"
                                                                   class="pa-0">
                                                                <v-select
                                                                        :label="$vuetify.breakpoint.mdAndDown ? 'Type' : ''"
                                                                        style="padding-top: 6px"
                                                                        dense
                                                                        v-model="line.type"
                                                                        :items="graphTypes"
                                                                        item-value="val"
                                                                        item-text="name"
                                                                        item-color="active"
                                                                        color="textColor"
                                                                        :dark="getLightness($store.getters.current.secondary) < 50"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row dense>
                                                            <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4"
                                                                   class="pa-0">
                                                                <v-subheader
                                                                        :style="{color: $store.getters.current.textColor}"
                                                                        class="pl-1">
                                                                    Dataset
                                                                </v-subheader>
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8"
                                                                   class="pa-0">
                                                                <v-select
                                                                        :label="$vuetify.breakpoint.mdAndDown ? 'Dataset' : ''"
                                                                        style="padding-top: 6px"
                                                                        dense
                                                                        v-model="line.data"
                                                                        :items="datasets"
                                                                        item-value="data"
                                                                        item-text="name"
                                                                        @change="(a) => datasets.forEach((b) => {if(a === b.data) line.dataId = b.name})"
                                                                        item-color="active"
                                                                        color="textColor"
                                                                        :dark="getLightness($store.getters.current.secondary) < 50"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row dense>
                                                            <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4"
                                                                   class="pa-0">
                                                                <v-subheader
                                                                        :style="{color: $store.getters.current.textColor}"
                                                                        class="pl-1">
                                                                    Y-Axis
                                                                </v-subheader>
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8"
                                                                   class="pa-0">
                                                                <v-select
                                                                        :label="$vuetify.breakpoint.mdAndDown ? 'Y-Axis' : ''"
                                                                        style="padding-top: 6px"
                                                                        dense
                                                                        :items="$store.getters.layout.tempoptions.yAxis.map((x, i) => ({idx: i, data: x}))"
                                                                        :value="line.yAxisIndex ? line.yAxisIndex : 0"
                                                                        item-text="data.name"
                                                                        item-value="idx"
                                                                        item-color="active"
                                                                        color="textColor"
                                                                        :dark="getLightness($store.getters.current.secondary) < 50"
                                                                        @change="(x) => setYAxis(x, index)"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row dense>
                                                            <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4"
                                                                   class="pa-0">
                                                                <v-subheader
                                                                        :style="{color: $store.getters.current.textColor}"
                                                                        class="pl-1">
                                                                    Color
                                                                </v-subheader>
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8"
                                                                   class="pa-0">
                                                                <v-hover v-slot:default="{ hover }">
                                                                    <div
                                                                            style="position: relative; width: 100%; height: 30px; border: 2px solid; margin-top: 9px"
                                                                            :style="{backgroundColor: line.itemStyle.color, borderColor: $store.getters.current.textColor}"
                                                                    >
                                                                        <v-scroll-x-transition>
                                                                            <v-color-picker
                                                                                    v-if="hover"
                                                                                    elevation="3"
                                                                                    style="position: absolute; z-index: 99999; top: -260px; left: calc(100% + 2px)"
                                                                                    hide-mode-switch
                                                                                    :style="{backgroundColor: $store.getters.current.secondary}"
                                                                                    v-model="line.itemStyle.color"
                                                                            />
                                                                        </v-scroll-x-transition>
                                                                    </div>
                                                                </v-hover>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </div>
                                    </v-expand-transition>
                                </div>
                            </v-fade-transition>
                            <v-fade-transition leave-absolute hide-on-leave>
                                <div v-if="!graph">
                                    <div v-for="(line, index) in $store.getters.layout.temppieoptions.series[0].data"
                                         :key="index">
                                        <div v-if="index > 0" style="width: 100%; height: 1px;"
                                             :style="{backgroundColor: $store.getters.current.accent2}"
                                             class="mt-2 mb-2"/>
                                        <v-row dense class="mr-3">
                                            <v-col cols="2" class="pa-0">
                                                <v-btn
                                                        small
                                                        icon
                                                        :style="{color: $store.getters.current.textColor, marginTop: '10px'}"
                                                        :color="$store.getters.current.accent"
                                                        @click="addPieSet(index)"
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                                <v-btn
                                                        small
                                                        icon
                                                        v-if="$store.getters.layout.temppieoptions.series[0].data.length > 1"
                                                        :style="{color: $store.getters.current.textColor, marginTop: '10px'}"
                                                        :color="$store.getters.current.accent"
                                                        @click="removePieSet(index)"
                                                >
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col class="pa-0">
                                                <v-row dense>
                                                    <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4" class="pa-0">
                                                        <v-subheader :style="{color: $store.getters.current.textColor}"
                                                                     class="pl-1">
                                                            Name
                                                        </v-subheader>
                                                    </v-col>
                                                    <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8" class="pa-0">
                                                        <v-text-field
                                                                :label="$vuetify.breakpoint.mdAndDown ? 'Name' : ''"
                                                                style="padding-top: 6px"
                                                                dense
                                                                v-model="line.name"
                                                                @input="(a) => $store.getters.layout.temppieoptions.legend.data[index] = a"
                                                                color="textColor"
                                                                :dark="getLightness($store.getters.current.secondary) < 50"
                                                        />
                                                    </v-col>
                                                </v-row>
                                                <v-row dense>
                                                    <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4" class="pa-0">
                                                        <v-subheader :style="{color: $store.getters.current.textColor}"
                                                                     class="pl-1">
                                                            Dataset
                                                        </v-subheader>
                                                    </v-col>
                                                    <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8" class="pa-0">
                                                        <v-select
                                                                :label="$vuetify.breakpoint.mdAndDown ? 'Dataset' : ''"
                                                                style="padding-top: 6px"
                                                                dense
                                                                v-model="line.value"
                                                                :items="Object.keys($store.getters.data.datasets).map(x => {return {name: translate(x), data: $store.getters.data.datasets[x]}})"
                                                                :item-value="(data) => data.data[data.data.length-1][1]"
                                                                @change="(a) => Object.keys($store.getters.data.datasets).forEach((b) => {if(a === $store.getters.data.datasets[b][$store.getters.data.datasets[b].length-1][1]) line.dataId = translate(b)})"
                                                                item-text="name"
                                                                item-color="active"
                                                                color="textColor"
                                                                :dark="getLightness($store.getters.current.secondary) < 50"
                                                        />
                                                    </v-col>
                                                </v-row>
                                                <v-row dense>
                                                    <v-col v-if="!$vuetify.breakpoint.mdAndDown" cols="4" class="pa-0">
                                                        <v-subheader :style="{color: $store.getters.current.textColor}"
                                                                     class="pl-1">
                                                            Color
                                                        </v-subheader>
                                                    </v-col>
                                                    <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12: 8" class="pa-0">
                                                        <v-hover v-slot:default="{ hover }">
                                                            <div
                                                                    style="position: relative; width: 100%; height: 30px; border: 2px solid; margin-top: 9px"
                                                                    :style="{backgroundColor: line.itemStyle.color, borderColor: $store.getters.current.textColor}"
                                                            >
                                                                <v-scroll-x-transition>
                                                                    <v-color-picker
                                                                            v-if="hover"
                                                                            elevation="3"
                                                                            style="position: absolute; z-index: 99999; top: -260px; left: calc(100% + 2px)"
                                                                            hide-mode-switch
                                                                            :style="{backgroundColor: $store.getters.current.secondary}"
                                                                            v-model="line.itemStyle.color"
                                                                    />
                                                                </v-scroll-x-transition>
                                                            </div>
                                                        </v-hover>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </div>
                            </v-fade-transition>
                        </v-col>
                        <v-col cols="8" v-if="!$vuetify.breakpoint.mdAndDown">
                            <chart
                                    :key="prevreload"
                                    autoresize
                                    style="width: 100%; left: 0"
                                    :options="graph ? $store.getters.layout.tempoptions: $store.getters.layout.temppieoptions"
                            />
                        </v-col>
                    </v-row>
                    <v-btn absolute tile
                           :style="{color: $store.getters.current.textColor, right: '12px', bottom: '12px'}"
                           :color="$store.getters.current.accent"
                           @click="() => {$store.commit('addLayoutContainer', construct(exportgraph(graph ? $store.getters.layout.tempoptions : $store.getters.layout.temppieoptions , graph ? 'graph': 'pie'))); $modal.hide('createGraph')}"
                    >
                        Add Graph
                    </v-btn>
                </v-container>
            </modal>
        </div>
    </v-container>
</template>

<script>
    import store from '../store/index';
    import {
        dataUnits,
        numberUnits,
        formatNumber,
        constructChart,
        deconstructChart,
        addData, translate, getLightness, biscuitUnits
    } from "@/constants";
    import DashGrid from "@/components/dashGrid";
    import Vue from 'vue'

    let ComponentClass = Vue.extend(DashGrid)
    export default {
        name: 'Dashboard',
        components: {
            chart: () => import('../components/asyncChart'),
        },
        data() {
            return {
                graph: true,
                showdatasets: true,
                showyaxis: true,
                prevreload: 0,
                units: [{
                    idx: 0,
                    name: 'None',
                    arr: []
                }, {
                    idx: 1,
                    name: 'Data',
                    arr: dataUnits
                }, {
                    idx: 2,
                    name: 'Number',
                    arr: numberUnits
                }],
                datasets: Object.keys(store.getters.data.datasets).map(x => translate(x)).sort().map(x => {
                    return {name: x, data: store.getters.data.datasets[translate(x, true)]}
                }),
                graphTypes: [{name: 'Line', val: 'line'}, {name: 'Bar', val: 'bar'}],
                instance: null
            }
        },
        mounted() {
            if (store.getters.options.superSecret)
                this.units = [{
                    idx: 0,
                    name: 'None',
                    arr: []
                }, {
                    idx: 1,
                    name: 'Data',
                    arr: dataUnits
                }, {
                    idx: 2,
                    name: 'Number',
                    arr: numberUnits
                }, {
                    idx: 3,
                    name: 'Biscuit',
                    arr: biscuitUnits
                }]
            this.$nextTick(() => {
                this.instance = new ComponentClass()
                this.instance.$mount()
                this.$refs.grid.appendChild(this.instance.$el)
            })
        },
        beforeDestroy() {
            this.instance.$destroy()
        },
        methods: {
            construct: (a) => constructChart(a),
            showModal() {
                this.uniqpieindex = 0;
                this.uniqindex = 0;
                this.axisindex = 0;
                store.commit('setTempOptions', constructChart({
                    type: 'graph',
                    title: {left: 'center', text: 'Title'},
                    tooltip: {trigger: 'axis', axisPointer: {type: 'cross', label: {formatter: 'number'}}},
                    legend: {left: 'center', show: true, top: 35, data: ['Item']},
                    yAxis: [{
                        type: 'value',
                        name: 'Axis',
                        scale: true,
                        offset: 0,
                        axisLabel: {unit: 2},
                        splitLine: {show: false}
                    }],
                    series: [{
                        name: 'Item',
                        type: 'line',
                        data: null,
                        dataId: this.datasets[0].name,
                        yAxisIndex: 0,
                        showSymbol: false,
                        itemStyle: {colorId: 'text'}
                    }]
                }))
                store.commit('setTempPieOptions', constructChart({
                    type: 'pie',
                    title: {
                        left: 'center',
                        text: 'Title',
                    },
                    legend: {
                        orient: 'vertical',
                        left: 0,
                        top: 10,
                        show: true,
                        data: ['Item'],
                    },
                    series: [
                        {
                            type: 'pie',
                            avoidLabelOverlap: true,
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {
                                    value: 0,
                                    name: 'Item',
                                    dataId: this.datasets[0].name,
                                    itemStyle: {colorId: 'text'}
                                }
                            ]
                        }
                    ]
                }))
                this.$modal.show('createGraph')
            },
            addSet(index) {
                let colorrand = '0123456789abcdef'
                let rand = '#'
                for (let i = 0; i < 6; i++) {
                    rand += colorrand.substr(Math.floor(Math.random() * colorrand.length), 1)
                }
                let a = {
                    name: 'item ' + (this.uniqindex++),
                    type: 'line',
                    data: this.datasets[0].data,
                    dataId: this.datasets[0].name,
                    yAxisIndex: 0,
                    showSymbol: false,
                    itemStyle: {
                        color: rand
                    }
                }
                store.getters.layout.tempoptions.series.splice(index + 1, 0, a)
                store.getters.layout.tempoptions.legend.data.splice(index + 1, 0, a.name)
                this.prevreload = !this.prevreload
            },
            removeSet(index) {
                store.getters.layout.tempoptions.series.splice(index, 1)
                store.getters.layout.tempoptions.legend.data.splice(index, 1)
                this.prevreload = !this.prevreload
            },
            addPieSet(index) {
                let colorrand = '0123456789abcdef'
                let rand = '#'
                for (let i = 0; i < 6; i++) {
                    rand += colorrand.substr(Math.floor(Math.random() * colorrand.length), 1)
                }
                let a = {
                    name: 'item ' + (this.uniqpieindex++),
                    value: store.getters.getLastValueOfDataset(translate(this.datasets[0].name, true)),
                    dataId: this.datasets[0].name,
                    itemStyle: {color: rand}
                }
                store.getters.layout.temppieoptions.series[0].data.splice(index + 1, 0, a)
                store.getters.layout.temppieoptions.legend.data.splice(index + 1, 0, a.name)
                this.prevreload = !this.prevreload
            },
            removePieSet(index) {
                store.getters.layout.temppieoptions.series[0].data.splice(index, 1)
                store.getters.layout.temppieoptions.legend.data.splice(index, 1)
                this.prevreload = !this.prevreload
            },
            setYAxis(axis, index) {
                store.getters.layout.tempoptions.series[index].yAxisIndex = axis
                this.prevreload = !this.prevreload
            },
            setYAxisUnits(unit, index) {
                if (unit === 0) {
                    store.getters.layout.tempoptions.yAxis[index].axisLabel = {
                        formatter: null,
                        unit: 0
                    }
                } else
                    store.getters.layout.tempoptions.yAxis[index].axisLabel = {
                        formatter: (x) => formatNumber(x, this.units[unit].arr),
                        unit: unit
                    }
                this.prevreload = !this.prevreload
            },
            addAxis(index) {
                store.getters.layout.tempoptions.yAxis.splice(index + 1, 0, {
                    type: 'value',
                    name: 'axis ' + (this.axisindex++),
                    offset: (store.getters.layout.tempoptions.yAxis.length - 1) * 80,
                    scale: true,
                    max: function (value) {
                        return (value.max).toFixed(5).replace(/\.?0*$/, '');
                    },
                    min: function (value) {
                        return (value.min).toFixed(5).replace(/\.?0*$/, '');
                    },
                    axisLine: {
                        lineStyle: {
                            color: store.getters.current.textColor
                        }
                    },
                    axisLabel: {
                        formatter: null,
                        unit: 0
                    },
                    splitLine: {
                        show: false
                    }
                })
                this.prevreload = !this.prevreload
            },
            removeAxis(index) {
                store.getters.layout.tempoptions.yAxis.splice(index, 1)
                this.prevreload = !this.prevreload
            },
            exportgraph: (a, t) => deconstructChart(a, t),
            addData: () => addData(),
            getLightness: (H) => getLightness(H),
            translate: (a, b) => translate(a, b),
            log(a) {
                console.log(a)
            }
        },
        computed: {
            g() {
                return this.graph
            }
        },
        watch: {
            g() {
                this.prevreload = !this.prevreload
            }
        }
    }
</script>
