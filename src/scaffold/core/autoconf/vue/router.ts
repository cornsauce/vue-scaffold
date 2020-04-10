import Vue from 'vue';
import VueRouter from 'vue-router';

import {Configurator} from '@/scaffold/core/configurator';
import {executeOnce} from '@/scaffold/utils/closure';

export function enableRouter(rootConfig: any, assemble: Scaffold.AssembleRouter): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(VueRouter);
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      state.autoconf.vueOptions.router = assemble(app, state, rootConfig)(rootConfig.router);
    };
  };
}