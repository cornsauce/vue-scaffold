import I18n, {LocaleMessageObject} from 'vue-i18n';

export const assembleI18n: Scaffold.AssembleI18n = (app, state, rootConfig) => (config: any) => {
  const i18n = new I18n({
    locale: config.defaultLocale,
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

    i18n.locale = locale;
    app.state.i18n.currentLocale = locale;
  };

  const loadLocale = async (locale: string): Promise<LocaleMessageObject> => {
    if (locale === i18n.locale) {
      return i18n.getLocaleMessage(locale);
    }

    return (await import(/* webpackChunkName: "lang-[request]" */ `@/app/lang/${locale}`)).default;
  };

  const loadAndSetLocale = async (locale: string): Promise<void> => {
    if (locale === i18n.locale) {
      return Promise.resolve();
    }

    if (!loadedLocales.includes(locale)) {
      const language = await loadLocale(locale);
      i18n.setLocaleMessage(locale, language);
      loadedLocales.push(locale);
    }

    setLocale(locale);
  };

  state.loadAndSetLocale = loadAndSetLocale;

  return i18n;
};
