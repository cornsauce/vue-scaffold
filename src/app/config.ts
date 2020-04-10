import defaultLanguage from '@/app/lang/zh-cn';
import {JWTProvider} from '@/scaffold/auth/jwt/provider';
import {stubs as mockStubs} from '@/app/api/v1/mock';

export const config = {
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
  api: {
    baseUrl: 'http://localhost:3000',
    headers: {},
    mock: {
      enabled: true,
      stubs: mockStubs,
    },
    auth: {
      provider: new JWTProvider(),
      headerName: 'Authentication',
    },
  },
};
