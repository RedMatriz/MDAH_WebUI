import Vue from 'vue'
import VueTimers from 'vue-timers'

Vue.use(VueTimers)

export default {
    timers: {
        update: { time: 1000, autostart: true }
    },
    methods: {
        update () {
            console.log('Hello world')
        }
    }
}