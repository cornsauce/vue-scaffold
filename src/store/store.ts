import Vuex from 'vuex';
import {RootState} from './state';
import {assembleI18n} from '@/store/i18n/store';

export const assembleStore = (rootConfig: any, config: any, state: any) => {
  return new Vuex.Store<RootState>({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      i18n: assembleI18n(rootConfig, config, state),
    },
  });
};
