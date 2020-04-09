import Vue from 'vue';
import I18n, {LocaleMessageObject} from 'vue-i18n';
import {config} from '@/app/config';

const loadedLocales: string[] = [config.i18n.defaultLocale];

function setLocale(locale: string) {
  if (!loadedLocales.includes(locale)) {
    throw new Error(`Locale '${locale}' is not available`);
  }

  i18n.locale = locale;
}

async function loadLocale(locale: string): Promise<LocaleMessageObject> {
  if (locale === i18n.locale) {
    return i18n.getLocaleMessage(locale);
  }

  return (await import(/* webpackChunkName: "lang-[request]" */ `@/app/lang/${locale}`)).default;
}

export async function loadAndSetLocale(locale: string): Promise<void> {
  if (locale === i18n.locale) {
    return Promise.resolve();
  }

  if (!loadedLocales.includes(locale)) {
    const language = await loadLocale(locale);
    i18n.setLocaleMessage(locale, language);
    loadedLocales.push(locale);
  }

  setLocale(locale);
}

Vue.use(I18n);

export const i18n = new I18n({
  fallbackLocale: config.i18n.defaultLocale,
  messages: {
    [config.i18n.defaultLocale]: config.i18n.defaultLanguage,
  },
});
