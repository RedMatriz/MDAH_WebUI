import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    current: 'light',
    themes: {
        light: {
            backgroundColor: '#f0f0f0',
            textColor: '#202020',
            primary: '#fefefe',
            secondary: '#fdfdfd',
            accent: '#000000',
            accent1: 'rgba(0,0,0,0.3)',
            isDark: false,
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
        },
        dark: {
            backgroundColor: '#353535',
            textColor: '#f0f0f0',
            primary: '#505050',
            secondary: '#454545',
            accent: '#606060',
            accent1: 'rgba(200,200,200,0.3)',
            isDark: true,
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
        },
        midnight: {
            backgroundColor: '#111',
            textColor: '#dfdfdf',
            primary: '#202020',
            secondary: '#232323',
            accent: '#a0a0a0',
            accent1: 'rgba(255,255,255,0.3)',
            isDark: true,
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
        },
    }
};

const getters = {
    current: state => state.themes[state.current]
};

export default new Vuex.Store({
    state,
    mutations: {
        setTheme(state, theme) {
            state.current = theme;
        }
    },
    getters,
});