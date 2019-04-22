import Vue from 'nativescript-vue';

import HelloWorld from './components/HelloWorld.vue';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    render: h => h('frame', [h(HelloWorld)])

}).$start();