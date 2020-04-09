import {Module} from 'vuex';
import {RootState} from '@/store/state';
import {I18nState} from './state';
import {SET_LOCALE, SetLocaleAction} from './action';
import {config} from '@/app/config';
import {loadAndSetLocale} from '@/support/i18n/i18n';

export const i18n: Module<I18nState, RootState> = {
  namespaced: true,
  state: {
    locale: config.i18n.defaultLocale,
  },
  actions: {
    [SET_LOCALE]: {
      root: true,
      async handler(context, {locale}: SetLocaleAction) {
        await loadAndSetLocale(locale);
      },
    },
  },
  mutations: {},
};
