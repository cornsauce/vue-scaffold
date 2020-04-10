import Vue from 'vue';
import {EventEmitter} from 'events';
import {Configurator} from '@/scaffold/core/configurator';
import {executeOnce} from '@/scaffold/utils/closure';
import {EventBusPlugin} from '@/scaffold/core/support/vue/plugins';

export function enableEventBus(rootConfig: any): Configurator {
  const enableFeature = executeOnce(() => {
    Vue.use(EventBusPlugin);
  });

  return (app) => {
    enableFeature();

    return (state) => () => {
      state.autoconf.vueOptions.bus = new EventEmitter();
    };
  };
}
