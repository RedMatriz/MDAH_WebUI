<template>
    <div :id="genid"></div>
</template>

<script>
    import {Terminal} from "xterm";
    import {FitAddon} from 'xterm-addon-fit';
    // import moment from 'moment'
    import store from '../store/index'
    import 'xterm/css/xterm.css'

    export default {
        name: "xterm",
        props: ['lines'],
        data() {
            return {genid: 'term', term: null, fitaddon: new FitAddon(), currentLine: 0}
        },
        beforeMount() {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 20; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            this.genid = result;
            this.term = new Terminal({
                disableStdin: false,
                cursorBlink: true,
                cursorStyle: 'underline',
                fontSize: 15,
                fastScrollModifier: 'shift',
                fastScrollSensitivity: 5
            });
            this.term.loadAddon(this.fitaddon);
        },
        mounted() {
            this.currentLine = store.getters.console.data.length
            this.term.open(document.getElementById(this.genid))
            window.addEventListener('resize', this.fit)
            this.$nextTick(() => this.fitaddon.fit())
            this.runFakeTerminal()
            store.getters.console.data.forEach((x) => this.writeMessage(x))
        },
        beforeDestroy() {
            clearInterval(this)
            this.term.dispose()
            window.removeEventListener('resize', this.fit)
        },
        methods: {
            fit() {
                this.fitaddon.fit()
            },
            writeMessage(input) {
                let date = input.substr(0, 20)
                let type = input.substr(20, 5)
                let message = input.substr(26)
                let tid = ''
                let line = ''
                if (message.includes('hit cache') || message.includes('cached and served') || message.includes('being served')) {
                    line = '\x1b[1;34m' //bright blue
                } else if (message.includes('missed cache')) {
                    line = '\x1b[34m' //blue
                }
                else if (message.includes('exception')) {//exception color
                    line = '\x1b[31m' //red
                }
                else if (message.includes('succeeded') || message.includes('committed')) { //success color
                    line = '\x1b[1;32m' //bright green
                } else if (message.includes('errored') || message.includes('failed') || message.includes('aborted')) { //fail color
                    line = '\x1b[1;31m' //bright red
                }
                switch (type){
                    case 'ERROR':
                        tid = '\x1b[1;31m' //bright red
                        break
                    case 'WARN ':
                        tid = '\x1b[1;33m' //bright yellow
                        break
                    case 'DEBUG':
                        tid = '\x1b[1;36m' //bright cyan
                        break
                }
                this.term.writeln(date + tid + type + ' \x1b[0m' + line + message + '\x1b[0m')
            },
            runFakeTerminal() {
                if (this.term._initialized) {
                    return;
                }
                this.term._initialized = true;
                //https://xtermjs.org/docs/api/terminal/interfaces/itheme/
                //colors ^
                this.term.writeln('Welcome to the Web UI console');
                this.term.writeln('Anti was super lazy and didnt bother to actually implement a console sync');
                this.term.writeln('Go ping him (please don\'t) to do some more work and stop reading manga');
                // this.term.writeln('You\'re still free to type and spam in this console to your heart\'s content tho');
                this.term.writeln('');
                // this.prompt(this.term);
                //
                // this.term.onData(e => {
                //     switch (e) {
                //         case '\r': // Enter
                //         case '\u0003': // Ctrl+C
                //             this.prompt(this.term);
                //             break;
                //         case '\u007F': // Backspace (DEL)
                //             // Do not delete the prompt
                //             if (this.term._core.buffer.x > 2) {
                //                 this.term.write('\b \b');
                //             }
                //             break;
                //         default: // Print all other characters for demo
                //             this.term.write(e);
                //     }
                // });
            },
            prompt(t) {
                t.write('\r\n> ');
            }
        },
        computed: {
            terchanged(){
                return store.getters.console.data
            }
        },
        watch: {
            terchanged(){
                let looped = false
                for (let i = this.currentLine; i < store.getters.console.data.length; i++){
                    this.writeMessage(store.getters.console.data[i])
                    looped = true
                }
                if (!looped)
                    this.writeMessage(store.getters.console.data[store.getters.console.data.length - 1])
                this.currentLine = store.getters.console.data.length
            }
        }
    }
</script>

<style>
    .xterm ::-webkit-scrollbar {
        width: 7px;
    }

    .xterm ::-webkit-scrollbar-track {
        background-color: #00000000;

    }

    .xterm ::-webkit-scrollbar-thumb {
        background-color: #FFF;
    }
</style>