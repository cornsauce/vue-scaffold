import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';

export function configureVue(rootConfig: any, provideVue: (options: any) => Vue): Configurator {
  return (app) => {
    Vue.config.productionTip = rootConfig.vue.productionTip || false;

    return (state) => () => {
      state.vue = state.autoconf.vue = provideVue(state.autoconf.vueOptions);
    };
  };
}
