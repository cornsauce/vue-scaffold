import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {VueIocPlugin} from '@vue-ioc/core';
import {executeOnce} from '@/scaffold/utils/closure';

export function configureIoc(rootConfig: any): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(VueIocPlugin);
    Vue.use((ctor) => {
      ctor.mixin({
        beforeCreate(): void {
          if (!this.$parent) {
            // @ts-ignore
            this.$vueIocContainer = this.$options.container;
          }
        },
      });
    });
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      state.autoconf.vueOptions.container = app.getContainer();
    };
  };
}
