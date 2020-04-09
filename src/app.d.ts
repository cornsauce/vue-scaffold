import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import {Store} from 'vuex';

declare global {
  interface BaseAppState<StateType = any> {
    vue?: {
      store: Store<StateType>;
      router: VueRouter;
      i18n: VueI18n;
      instance: Vue;
    };
  }
}


