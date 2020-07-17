import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import store from '../store/index'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        // dark: true,
        options: {
            customProperties: true
        },
        themes: {
            // dark: store.getters.current
            light: {
                backgroundColor: '#efeff0',
                textColor: '#202020',
                primary: '#fbfbfe',
                secondary: '#fafafa',
                active: '#e7e7e7',
                accent: '#717175ff',
                accent1: '#96969eB4',
                accent2: '#5e5e624D',
                green: '#00e000',
                red: '#e00000',
                yellow: '#e0e000',
            }
        }
    }
});
