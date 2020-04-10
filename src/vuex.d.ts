import Router from 'vue-router';
import I18n from 'vue-i18n';
import {Application} from '@/core/application';

declare module 'vuex' {

  interface Store<S> {
    $app: Application;
    $route: Router;
    $i18n: I18n;
  }
}
