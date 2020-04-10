import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {Configurator} from '@/core/configurator';
import {executeOnce} from '@/support/utils/closure';

export function enableI18n(rootConfig: any, assemble: (config: any) => any): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(VueI18n);
  });

  return () => {
    enableFeature();

    return (state) => () => {
      const i18n = assemble(rootConfig.i18n);

      state.autoconf.vueOptions.i18n = i18n.i18n;
      state.loadAndSetLocale = i18n.loadAndSetLocale;
    };
  };
}
