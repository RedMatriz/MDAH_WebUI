import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    current: 'light',
    hasBgImage: false,
    bgImage: 'https://images3.alphacoders.com/819/thumb-1920-819294.png',
    themes: {
        light: {
            backgroundAlpha: 'f0',
            backgroundColor: '#f0f0f0',
            textColor: '#202020',
            primary: '#fefefe',
            secondary: '#fdfdfd',
            accent: '#000000',
            accent1: 'rgba(0,0,0,0.3)',
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
            isDark: false,
        },
        dark: {
            backgroundAlpha: 'f0',
            backgroundColor: '#353535',
            textColor: '#f0f0f0',
            primary: '#505050',
            secondary: '#454545',
            accent: '#606060',
            accent1: 'rgba(200,200,200,0.3)',
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
            isDark: true,
        },
        midnight: {
            backgroundAlpha: 'f0',
            backgroundColor: '#111',
            textColor: '#dfdfdf',
            primary: '#202020',
            secondary: '#232323',
            accent: '#a0a0a0',
            accent1: 'rgba(255,255,255,0.3)',
            green: '#00e000',
            red: '#e00000',
            yellow: '#e0e000',
            isDark: true,
        },
    },
    data: {
        stats: [],
        maxPoints: 61,
        maxStorePoints: 3601,
    }
};

const getters = {
    current: state => state.themes[state.current],
    hasBgImage: state => state.hasBgImage,
    bgImg: state => state.bgImage,
    alpha: state => {return (state.hasBgImage ? state.themes[state.current].backgroundAlpha : 'ff')},
    data: state => state.data
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