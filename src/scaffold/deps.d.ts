import {EventEmitter} from 'events';
import {Application} from '@/scaffold/core/application';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

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

declare module 'vuex' {
  interface Store<S> {
    $app: Application;
    $route: VueRouter;
    $i18n: VueI18n;
    $bus?: EventEmitter;
  }
}
