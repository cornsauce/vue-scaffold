import Vue from 'vue';
import {VueIocPlugin} from '@vue-ioc/core';
import {Plugin} from './support/vue/plugin';
import {executeOnce} from '@/support/utils/closure';

const init = executeOnce(() => {
  Vue.use(VueIocPlugin);
  Vue.use(Plugin);
});

init();
