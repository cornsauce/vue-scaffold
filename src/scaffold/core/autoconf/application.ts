import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {executeOnce} from '@/scaffold/utils/closure';
import {ApplicationPlugin} from '@/scaffold/core/support/vue/plugins';

export function configureApplication(rootConfig: any): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(ApplicationPlugin);
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      state.autoconf.vueOptions.app = app;
    };
  };
}
