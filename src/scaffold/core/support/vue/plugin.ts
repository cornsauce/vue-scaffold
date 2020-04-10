import {PluginFunction} from 'vue';
import {Application} from '@/scaffold/core/application';

export const INJECTED = '.support.vue.plugin.INJECTED';

interface PluginOptions {
  app?: Application;
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
