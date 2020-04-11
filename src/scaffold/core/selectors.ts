import {Selector} from '@/scaffold/core/application';

export const currentLocale: Selector<string> = (app) => app.state.i18n.currentLocale;
