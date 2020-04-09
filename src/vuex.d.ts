import Router from 'vue-router';
import I18n from 'vue-i18n';
import {App} from '@/core/app';

declare module 'vuex' {

  interface Store<S> {
    $app: App;
    $route: Router;
    $i18n: I18n;
  }
}
