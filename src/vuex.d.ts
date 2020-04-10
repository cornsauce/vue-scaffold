import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import {EventEmitter} from 'events';
import {Application} from '@/scaffold/core/application';

declare module 'vuex' {
  interface Store<S> {
    $app: Application;
    $route: VueRouter;
    $i18n: VueI18n;
    $bus?: EventEmitter;
  }
}
