import Vue from 'vue';
import {Configurator} from '@/scaffold/core/application';
import {executeOnce} from '@/scaffold/utils/closure';
import {ApplicationPlugin} from '@/scaffold/core/support/vue/plugins';
import {BeanConstant} from '@/scaffold/core/constant';

export function configureApplication(rootConfig: App.Config): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(ApplicationPlugin);
  });

  return (app) => {
    enableFeature();
    app.getContainer().bind(BeanConstant.APP).toConstantValue(app);

    return (state) => () => {
      state.autoconf.vueOptions.app = app;
    };
  };
}
