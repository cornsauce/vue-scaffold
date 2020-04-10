import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import {EventEmitter} from 'events';
import {Application} from '@/scaffold/core/application';
import {InterceptorManager} from '@/scaffold/support/axios/interceptor';


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

declare module 'axios' {
  interface AxiosInstance {
    interceptorManager?: InterceptorManager;
  }
}
