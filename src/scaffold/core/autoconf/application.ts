import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {executeOnce} from '@/scaffold/utils/closure';
import {ApplicationPlugin} from '@/scaffold/core/support/vue/plugins';
import {Beans} from '@/scaffold/core/beans';

export function configureApplication(rootConfig: App.Config): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(ApplicationPlugin);
  });

  return (app) => {
    enableFeature();
    app.getContainer().bind(Beans.APP).toConstantValue(app);

    return (state) => () => {
      state.autoconf.vueOptions.app = app;
    };
  };
}
