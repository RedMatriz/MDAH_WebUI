<template>
    <div :id="genid"></div>
</template>

<script>
    import {Terminal} from "xterm";

    export default {
        name: "xterm",
        props: ['lines'],
        data() {
            return {genid: 'term', term: null}
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
                rows: 30,
                cols: 50,
                cursorBlink: true,
                cursorStyle: 'underline',
                fontSize: 15
            });
        },
        mounted() {
            this.term.open(document.getElementById(this.genid))
            window.addEventListener('resize', this.fit)
            this.fit()
            this.runFakeTerminal()
        },
        beforeDestroy () {
            this.term.dispose()
            window.removeEventListener('resize', this.fit)
        },
        methods: {
            fit() {
                let parent = this.$el.parentNode
                this.term.resize(
                    Math.floor((parent.offsetWidth - 36) / this.term.getOption("fontSize") * 5 / 3),
                    Math.floor((window.innerHeight/1.5- 196) / this.term.getOption("fontSize") * 15 / 17),
                )
            },
            runFakeTerminal() {
                if (this.term._initialized) {
                    return;
                }
                this.term._initialized = true;
                this.term.writeln('Welcome to the Web UI console');
                this.term.writeln('Anti was super lazy and didnt bother to actually implement a console sync');
                this.term.writeln('Go ping him (please don\'t) to do some more work and stop reading manga');
                this.term.writeln('You\'re still free to type and spam in this console to your heart\'s content tho');
                this.term.writeln('');
                this.prompt(this.term);

                this.term.onData(e => {
                    switch (e) {
                        case '\r': // Enter
                        case '\u0003': // Ctrl+C
                            this.prompt(this.term);
                            break;
                        case '\u007F': // Backspace (DEL)
                            // Do not delete the prompt
                            if (this.term._core.buffer.x > 2) {
                                this.term.write('\b \b');
                            }
                            break;
                        default: // Print all other characters for demo
                            this.term.write(e);
                            this.fit()
                    }
                });
            },
            prompt(t) {
                t.write('\r\n> ');
            }
        }
    }
</script>

<style>
    /**
     * Copyright (c) 2014 The xterm.js authors. All rights reserved.
     * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
     * https://github.com/chjj/term.js
     * @license MIT
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     *
     * Originally forked from (with the author's permission):
     *   Fabrice Bellard's javascript vt100 for jslinux:
     *   http://bellard.org/jslinux/
     *   Copyright (c) 2011 Fabrice Bellard
     *   The original design remains. The terminal itself
     *   has been extended to include xterm CSI codes, among
     *   other features.
     */

    /**
     *  Default styles for xterm.js
     */

    .xterm {
        font-feature-settings: "liga" 0;
        position: relative;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
    }

    .xterm.focus,
    .xterm:focus {
        outline: none;
    }

    .xterm .xterm-helpers {
        position: absolute;
        top: 0;
        /**
         * The z-index of the helpers must be higher than the canvases in order for
         * IMEs to appear on top.
         */
        z-index: 5;
    }

    .xterm .xterm-helper-textarea {
        /*
         * HACK: to fix IE's blinking cursor
         * Move textarea out of the screen to the far left, so that the cursor is not visible.
         */
        position: absolute;
        opacity: 0;
        left: -9999em;
        top: 0;
        width: 0;
        height: 0;
        z-index: -5;
        /** Prevent wrapping so the IME appears against the textarea at the correct position */
        white-space: nowrap;
        overflow: hidden;
        resize: none;
    }

    .xterm .composition-view {
        /* TODO: Composition position got messed up somewhere */
        background: #000;
        color: #FFF;
        display: none;
        position: absolute;
        white-space: nowrap;
        z-index: 1;
    }

    .xterm .composition-view.active {
        display: block;
    }

    .xterm .xterm-viewport {
        /* On OS X this is required in order for the scroll bar to appear fully opaque */
        background-color: #000;
        overflow-y: scroll;
        cursor: default;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .xterm .xterm-screen {
        position: relative;
    }

    .xterm .xterm-screen canvas {
        position: absolute;
        left: 0;
        top: 0;
    }

    .xterm .xterm-scroll-area {
        visibility: hidden;
    }

    .xterm-char-measure-element {
        display: inline-block;
        visibility: hidden;
        position: absolute;
        top: 0;
        left: -9999em;
        line-height: normal;
    }

    .xterm {
        cursor: text;
    }

    .xterm.enable-mouse-events {
        /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
        cursor: default;
    }

    .xterm.xterm-cursor-pointer {
        cursor: pointer;
    }

    .xterm.column-select.focus {
        /* Column selection mode */
        cursor: crosshair;
    }

    .xterm .xterm-accessibility,
    .xterm .xterm-message {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        color: transparent;
    }

    .xterm .live-region {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

    .xterm-dim {
        opacity: 0.5;
    }

    .xterm-underline {
        text-decoration: underline;
    }

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