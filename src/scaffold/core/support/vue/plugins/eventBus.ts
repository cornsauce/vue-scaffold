import {PluginFunction} from 'vue';
import {EventEmitter} from 'events';

export const INJECTED = '.scaffold.support.vue.plugins.eventBus.INJECTED';

interface EventBusPluginOptions {
  bus?: EventEmitter;
}

export const EventBusPlugin: PluginFunction<EventBusPluginOptions> = (ctor) => {
  ctor.mixin({
    beforeCreate(): void {
      this.$bus = this.$options.parent?.$bus || this.$options.bus;

      if (typeof this.$options.parent === 'undefined' &&
        typeof this.$options.bus !== 'undefined') {
        this.$options.app?.getEventEmitter().emit(INJECTED);
      }
    },
  });
};
