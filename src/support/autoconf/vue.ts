import Vue from 'vue';
import {Configurator} from '@/core/configurator';

export function enableVue(rootConfig: any, provide: (options: any) => Vue): Configurator {
  return (app) => (state) => () => {
    const options: any = {};

    options.app = app;

    if (rootConfig.router.enabled) {
      options.router = state.autoconf.router;
    }

    if (rootConfig.i18n.enabled) {
      options.i18n = state.autoconf.i18n;
    }

    if (rootConfig.vuex.enabled) {
      options.store = state.autoconf.store;
    }

    state.vue = state.autoconf.vue = provide(options);
  };
}
