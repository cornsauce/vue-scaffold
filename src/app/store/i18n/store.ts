import {Module} from 'vuex';
import {RootState} from '@/app/store/state';
import {I18nState} from './state';
import {SET_LOCALE, SetLocaleAction} from './action';

export const assembleI18n = (rootConfig: any, config: any, state: any): Module<I18nState, RootState> => {
  return {
    namespaced: true,
    state: {
      locale: rootConfig.i18n.defaultLocale,
    },
    actions: {
      [SET_LOCALE]: {
        root: true,
        async handler(context, {locale}: SetLocaleAction) {
          await state.loadAndSetLocale(locale);
        },
      },
    },
    mutations: {},
  };
};
