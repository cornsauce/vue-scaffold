import Vue from 'vue';
import {VueIocPlugin} from '@vue-ioc/core';
import {Plugin} from './support/vue/plugin';

let executedFlag = false;

function _init() {
  if (executedFlag) {
    return;
  }

  Vue.use(VueIocPlugin);
  Vue.use(Plugin);

  executedFlag = true;
}

_init();
