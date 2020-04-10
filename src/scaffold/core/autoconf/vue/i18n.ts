import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {Configurator} from '@/scaffold/core/configurator';
import {executeOnce} from '@/scaffold/utils/closure';

export function enableI18n(rootConfig: any, assemble: Scaffold.AssembleI18n): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(VueI18n);
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      if (rootConfig.i18n.enabled) {
        state.autoconf.vueOptions.i18n = assemble(app, state, rootConfig)(rootConfig.i18n);
      }
    };
  };
}
