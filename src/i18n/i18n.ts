import I18n, {LocaleMessageObject} from 'vue-i18n';

export const assembleI18n = (config: any) => {
  const instance = new I18n({
    fallbackLocale: config.defaultLocale,
    messages: {
      [config.defaultLocale]: config.defaultLanguage,
    },
  });

  const loadedLocales: string[] = [config.defaultLocale];

  const setLocale = (locale: string) => {
    if (!loadedLocales.includes(locale)) {
      throw new Error(`Locale '${locale}' is not available`);
    }

    instance.locale = locale;
  };

  const loadLocale = async (locale: string): Promise<LocaleMessageObject> => {
    if (locale === instance.locale) {
      return instance.getLocaleMessage(locale);
    }

    return (await import(/* webpackChunkName: "lang-[request]" */ `@/app/lang/${locale}`)).default;
  };

  const loadAndSetLocale = async (locale: string): Promise<void> => {
    if (locale === instance.locale) {
      return Promise.resolve();
    }

    if (!loadedLocales.includes(locale)) {
      const language = await loadLocale(locale);
      instance.setLocaleMessage(locale, language);
      loadedLocales.push(locale);
    }

    setLocale(locale);
  };

  return {
    i18n: instance,
    loadAndSetLocale,
  };
};
