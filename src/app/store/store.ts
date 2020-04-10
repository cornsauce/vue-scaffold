import Vuex from 'vuex';
import {RootState} from './state';
import {assembleI18n} from '@/app/store/i18n/store';

export const assembleStore: Scaffold.AssembleStore<RootState> = (app, state, rootConfig) => (config: any) => {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      i18n: assembleI18n(rootConfig, config, state),
    },
  });
};
