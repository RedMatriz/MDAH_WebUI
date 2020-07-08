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
                            :color="$store.getters.current.accent1"
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
                            :color="$store.getters.current.accent1"
                            tile
                            @click="showModal"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <div ref="grid" style="position:relative; width: calc(100% + 24px); left: -12px"
             :hidden="$vuetify.breakpoint.smAndDown"></div>
        <!--        <dash-grid/>-->
        <v-row v-if="$vuetify.breakpoint.smAndDown">
            <v-col cols="12" v-for="(item, index) in $store.getters.layout.charts" class="pb-0" :key="index">
                <v-container fluid style="height: 300px;width: 100%; position: relative"
                             :style="{backgroundColor: $store.getters.current.secondary + $store.getters.alpha}">
                    <chart style="height: 100%;width: 100%" autoresize
                           :options="item"/>
                    <v-icon :style="{position: 'absolute', color: $store.getters.current.accent, top: '2px', right: '2px'}"
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
                                            :dark="$store.getters.current.isDark"
                                    />
                                    <v-text-field
                                            v-if="!graph"
                                            class="pt-1"
                                            dense
                                            v-model="$store.getters.layout.temppieoptions.title.text"
                                            :dark="$store.getters.current.isDark"
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
                                            :dark="$store.getters.current.isDark"
                                    >
                                        <v-btn
                                                v-model="graph"
                                                :style="{color: $store.getters.current.textColor}"
                                                :color="$store.getters.current.accent1"
                                                small>
                                            Graph
                                        </v-btn>
                                        <v-btn :style="{color: $store.getters.current.textColor}"
                                               :color="$store.getters.current.accent1"
                                               small>
                                            Pie
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                            <v-fade-transition>
                                <div v-if="graph">
                                    <v-btn
                                            style="width: 100%; height: 14px; padding-top: 2px; padding-bottom: 2px"
                                            :style="{color: $store.getters.current.textColor}"
                                            :color="$store.getters.current.accent1"
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
                                                                :color="$store.getters.current.accent1"
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
                                                                :color="$store.getters.current.accent1"
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
                                                                        :dark="$store.getters.current.isDark"
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
                                                                        :dark="$store.getters.current.isDark"
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
                                            :color="$store.getters.current.accent1"
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
                                                                :color="$store.getters.current.accent1"
                                                                @click="addSet(index)"
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-btn>
                                                        <v-btn
                                                                small
                                                                icon
                                                                v-if="$store.getters.layout.tempoptions.series.length > 1"
                                                                :style="{color: $store.getters.current.textColor, marginTop: '10px'}"
                                                                :color="$store.getters.current.accent1"
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
                                                                        :dark="$store.getters.current.isDark"
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
                                                                        :dark="$store.getters.current.isDark"
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
                                                                        :items="trackabledata"
                                                                        item-value="data"
                                                                        item-text="name"
                                                                        @change="(a) => trackabledata.forEach((b) => {if(a === b.data) line.dataId = b.name})"
                                                                        :dark="$store.getters.current.isDark"
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
                                                                        :dark="$store.getters.current.isDark"
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
                            <v-fade-transition>
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
                                                        :color="$store.getters.current.accent1"
                                                        @click="addPieSet(index)"
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                                <v-btn
                                                        small
                                                        icon
                                                        v-if="$store.getters.layout.temppieoptions.series[0].data.length > 1"
                                                        :style="{color: $store.getters.current.textColor, marginTop: '10px'}"
                                                        :color="$store.getters.current.accent1"
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
                                                                :dark="$store.getters.current.isDark"
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
                                                                :items="trackabledata"
                                                                :item-value="(data) => data.data[data.data.length-1][1]"
                                                                @change="(a) => trackabledata.forEach((b) => {if(a === b.data[b.data.length-1][1]) line.dataId = b.name})"
                                                                item-text="name"
                                                                :dark="$store.getters.current.isDark"
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
                           :color="$store.getters.current.accent1"
                           @click="() => {$store.commit('addLayoutContainer', construct(exportgraph(graph ? $store.getters.layout.tempoptions : $store.getters.layout.temppieoptions , graph ? 'graph': 'pie'))); $modal.hide('createGraph')}"
                    >
                        Add Graph
                    </v-btn>
                </v-container>
            </modal>
        </div>
<!--        <v-btn @click="adddata">-->
<!--            add-->
<!--        </v-btn>-->
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
        addData,
    } from "@/constants";
    import moment from "moment";
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
                trackabledata: [
                    {name: 'Hits', data: store.getters.data.hits},
                    {name: 'Misses', data: store.getters.data.misses},
                    {name: 'Browser Cached', data: store.getters.data.cached},
                    {name: 'Requests Served', data: store.getters.data.reqServ},
                    {name: 'Bytes Sent', data: store.getters.data.bytesSent},
                    {name: 'Bytes On Disk', data: store.getters.data.sizeDisk},
                    {name: 'Change in Hits', data: store.getters.data.hitsChange},
                    {name: 'Change in Misses', data: store.getters.data.missesChange},
                    {name: 'Change in Browser Cached', data: store.getters.data.cachedChange},
                    {name: 'Change in Requests Served', data: store.getters.data.reqServChange},
                    {name: 'Change in Bytes Sent', data: store.getters.data.bytesSentChange},
                    {name: 'Change in Bytes On Disk', data: store.getters.data.sizeDiskChange},
                ],
                graphTypes: [{name: 'Line', val: 'line'}, {name: 'Bar', val: 'bar'}],
                instance: null
            }
        },
        mounted() {
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
                store.commit('setTempOptions', {
                    title: {
                        left: 'center',
                        text: 'Title',
                        textStyle: {
                            color: store.getters.current.textColor
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                color: store.getters.current.secondary,
                                formatter: (point) => {
                                    if (point.axisDimension === 'x' && point.seriesData[0] && point.seriesData[0].data)
                                        return moment.utc(point.seriesData[0].data[0]).format('MMM D, h:mm:ssa')
                                    return point.value.toFixed(0)
                                }
                            },
                        }
                    },
                    toolbox: {
                        orient: 'vertical',
                        top: 30,
                        iconStyle: {
                            color: store.getters.current.accent,
                            borderColor: '#00000000'
                        },
                        emphasis: {
                            iconStyle: {
                                textPosition: 'left',
                                color: store.getters.current.accent2,
                                borderColor: '#00000000'
                            }
                        },
                        feature: {
                            dataZoom: {
                                show: true,
                                yAxisIndex: 'none',
                                icon: {
                                    zoom: 'M14,17H17V14H19V17H22V19H19V22H17V19H14V17M12,17V19H9V17H12M7,17V19H3V15H5V17H7M3,13V10H5V13H3M3,8V4H7V6H5V8H3M9,4H12V6H9V4M15,4H19V8H17V6H15V4M19,10V12H17V10H19Z',
                                    back: 'M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z'
                                },
                                title: {
                                    zoom: 'Zoom',
                                    back: "Undo"
                                }
                            },
                            restore: {
                                title: 'Restore',
                                icon: 'M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z',
                            }
                        }
                    },
                    grid: {
                        right: 40,
                        left: 40,
                        bottom: 40,
                        top: 60,
                        containLabel: true,
                    },
                    legend: {
                        left: 'center',
                        show: true,
                        top: 22,
                        data: ['item'],
                        inactiveColor: store.getters.current.accent2,
                        textStyle: {
                            color: store.getters.current.textColor
                        }
                    },
                    xAxis: {
                        type: 'time',
                        axisLine: {
                            lineStyle: {
                                color: store.getters.current.textColor
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: store.getters.current.accent1
                            }
                        },
                        axisLabel: {
                            formatter: (value) => moment.utc(value).format('MMM D|h:mma').replace('|', '\n'),
                            splitNumber: 10,
                            showMaxLabel: true,
                            showMinLabel: true,
                        },
                        // value: store.getters.data.date
                    },
                    yAxis: [{
                        type: 'value',
                        name: 'axis',
                        scale: true,
                        max: (value) => value.max.toFixed(5).replace(/\.?0*$/, ''),
                        min: (value) => value.min.toFixed(5).replace(/\.?0*$/, ''),
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
                        },
                    }],
                    dataZoom: [{
                        type: 'inside',
                    }, {
                        start: 90,
                        type: 'slider',
                        handleSize: '100%',
                        fillerColor: store.getters.current.accent1,
                        handleStyle: {
                            color: store.getters.current.textColor,
                        },
                        dataBackground: {
                            lineStyle: {
                                color: store.getters.current.textColor
                            },
                            areaStyle: {
                                color: store.getters.current.accent
                            }
                        },
                        textStyle: {
                            color: store.getters.current.textColor
                        },
                    }],
                    series: [{
                        name: 'item',
                        type: 'line',
                        data: store.getters.data.hits,
                        dataId: 'Hits',
                        yAxisIndex: 0,
                        showSymbol: false,
                        itemStyle: {color: '#ef0e00'}
                    }]
                })
                store.commit('setTempPieOptions', {
                    title: {
                        left: 'center',
                        text: 'Title',
                        textStyle: {
                            color: store.getters.current.textColor
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: ' {b}<br/>{c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        show: true,
                        left: 0,
                        data: ['item'],
                        inactiveColor: store.getters.current.accent2,
                        textStyle: {
                            color: store.getters.current.textColor
                        }
                    },
                    series: [{
                        type: 'pie',
                        avoidLabelOverlap: true,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        },
                        data: [{
                            name: 'item',
                            value: store.getters.data.hits[store.getters.data.hits.length - 1] ?
                                store.getters.data.hits[store.getters.data.hits.length - 1][1] : 0,
                            dataId: 'Hits',
                            itemStyle: {color: '#ef0e00'}
                        }]
                    }]
                })
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
                    data: store.getters.data.hits.map((x) => x),
                    dataId: 'Hits',
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
                    value: store.getters.data.hits[store.getters.data.hits.length - 1] ?
                        store.getters.data.hits[store.getters.data.hits.length - 1][1] : 0,
                    dataId: 'Hits',
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
            adddata: () => addData(),
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
