import defaultLanguage from '@/app/lang/zh-cn';
import {ErrorHandleInterceptor} from '@/app/axios/interceptors';
import {stubs as mockStubs} from '@/app/api/v1/mock';
import {JWTEndpoint} from '@/app/auth/jwt/endpoint';
import {API} from '@/app/api/v1/api';
import {JWTGuest} from '@/scaffold/support/auth/jwt';
import {Application} from '@/scaffold/core/application';
import {I18nInterceptor} from '@/app/axios/interceptors/i18n';

export const config: (app: Application) => App.Config = (app: Application) => ({
  vue: {
    productionTip: false,
  },
  vuex: {
    enabled: true,
  },
  router: {
    enabled: true,
  },
  i18n: {
    enabled: true,
    locales: [
      {name: 'zh-cn', aliases: ['zh']},
      {name: 'en-us'},
    ],
    defaultLocale: 'zh-cn',
    defaultLanguage,
  },
  axios: {
    interceptors: [
      (new ErrorHandleInterceptor()).asInterceptor(),
      (new I18nInterceptor({app})).asInterceptor(),
    ],
  },
  api: {
    class: API,
    baseUrl: 'http://localhost:3000',
    headers: {},
    auth: {
      enabled: true,
      headerName: 'Authentication',
      interceptor: {
        enabled: true,
      },
    },
    mock: {
      enabled: true,
      stubs: mockStubs,
    },
  },
  auth: {
    enabled: true,
    driver: 'jwt',
    endpoint: JWTEndpoint,
    guest: new JWTGuest({
      authorize: () => Promise.resolve(false),
    }),
  },
});
