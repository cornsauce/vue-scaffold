import Vue, {ComponentOptions} from 'vue';
import {EventEmitter} from 'events';
import {Application} from '@/scaffold/core/application';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    app?: Application;
    bus?: EventEmitter;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $app?: Application;
    $bus?: EventEmitter;
  }
}
