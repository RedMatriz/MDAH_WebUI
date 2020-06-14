import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#9cacd7',
                secondary: '#7894a3',
                accent: '#242b32',
                anchor: '#272838',
                background: '#f0f0f0'
            },
        },
    }
});
