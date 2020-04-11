import defaultLanguage from '@/app/lang/zh-cn';
import {ErrorHandleInterceptor} from '@/app/axios/interceptors';
import {stubs as mockStubs} from '@/app/api/v1/mock';
import {JWTEndpoint} from '@/app/auth/jwt/endpoint';
import {API} from '@/app/api/v1/api';
import {JWTGuest} from '@/scaffold/support/auth/jwt';

export const config: App.Config = {
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
};
