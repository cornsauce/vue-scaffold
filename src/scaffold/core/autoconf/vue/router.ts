import Vue from 'vue';
import VueRouter from 'vue-router';
import {Configurator} from '@/scaffold/core/application';
import {executeOnce} from '@/scaffold/utils/closure';

export function configureRouter(rootConfig: App.Config, assemble: Scaffold.AssembleRouter): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(VueRouter);
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      if (rootConfig.router.enabled) {
        state.autoconf.vueOptions.router = assemble(app, state, rootConfig)(rootConfig.router);
      }
    };
  };
}
