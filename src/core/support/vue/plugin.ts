import {PluginFunction} from 'vue';
import {App} from '@/core/app';

export const INJECTED = '.support.vue.plugin.INJECTED';

interface PluginOptions {
  app?: App;
}

export const Plugin: PluginFunction<PluginOptions> = (ctor) => {
  ctor.mixin({
    beforeCreate(): void {
      this.$app = this.$options.app || this.$options.parent?.$app;

      if (typeof this.$options.parent === 'undefined' &&
        typeof this.$options.app !== 'undefined') {
        this.$options.app.getEventEmitter().emit(INJECTED);
      }
    },
  });
};
