import Vue from 'vue';
import Vuex from 'vuex';
import {Configurator} from '@/scaffold/core/configurator';
import {executeOnce} from '@/scaffold/utils/closure';

export function configureVuex<StateType>(rootConfig: any, assemble: Scaffold.AssembleStore<StateType>): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(Vuex);
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      if (rootConfig.vuex.enabled) {
        state.autoconf.vueOptions.store = assemble(app, state, rootConfig)(rootConfig.vuex);
      }
    };
  };
}
