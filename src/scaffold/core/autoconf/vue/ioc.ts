import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {VueIocPlugin} from '@vue-ioc/core';

export function enableIoc(rootConfig: any): Configurator {
  return (app) => {
    Vue.use(VueIocPlugin);
    Vue.use((ctor) => {
      ctor.mixin({
        beforeCreate(): void {
          if (!this.$parent) {
            // @ts-ignore
            this.$vueIocContainer = app.getContainer();
          }
        },
      });
    });


    return (state) => () => {
    };
  };
}
