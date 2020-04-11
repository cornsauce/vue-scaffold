import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {Configurator} from '@/scaffold/core/application';
import {executeOnce} from '@/scaffold/utils/closure';

export function configureI18n(rootConfig: App.Config, assemble: Scaffold.AssembleI18n): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(VueI18n);
  });

  return (app) => {
    enableFeature();

    app.state.i18n = {};
    app.state.i18n.currentLocale = rootConfig.i18n.defaultLocale;

    return (state) => () => {
      if (rootConfig.i18n.enabled) {
        state.autoconf.vueOptions.i18n = assemble(app, state, rootConfig)(rootConfig.i18n);
      }
    };
  };
}
