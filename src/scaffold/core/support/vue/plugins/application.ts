import {PluginFunction} from 'vue';
import {Application} from '@/scaffold/core/application';

export const INJECTED = '.scaffold.support.vue.plugins.application.INJECTED';

interface ApplicationPluginOptions {
  app?: Application;
}

export const ApplicationPlugin: PluginFunction<ApplicationPluginOptions> = (ctor) => {
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
