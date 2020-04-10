import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {Configurator} from '@/core/configurator';
import {executeOnce} from '@/support/utils/closure';

export function enableVuex<S>(rootConfig: any, assemble: (rootConfig: any, config: any, state: any) => Store<S>): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(Vuex);
  });

  return () => {
    enableFeature();

    return (state) => () => {
      state.autoconf.vueOptions.store = assemble(rootConfig, rootConfig.vuex, state);
    };
  };
}
