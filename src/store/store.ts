import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {i18n} from './i18n';
import {RootState} from './state';

Vue.use(Vuex);

const options: StoreOptions<RootState> = {
  state: {},
  mutations: {},
  actions: {},
  modules: {
    i18n,
  },
};

export const store = new Vuex.Store(options);
