import Vue from 'vue';
import VueRouter from 'vue-router';
import {Configurator} from '@/core/configurator';
import {executeOnce} from '@/support/utils/closure';

export function enableRouter(rootConfig: any, assemble: (config: any) => VueRouter): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(VueRouter);
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      state.autoconf.vueOptions.router = assemble(rootConfig.router);
    };
  };
}
