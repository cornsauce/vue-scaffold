import Vue from 'vue';
import {Configurator} from '@/scaffold/core/application';

export function configureVue(rootConfig: App.Config, provideVue: (options: any) => Vue): Configurator {
  return (app) => {
    Vue.config.productionTip = rootConfig.vue.productionTip || false;

    return (state) => () => {
      state.vue = state.autoconf.vue = provideVue(state.autoconf.vueOptions);
    };
  };
}
