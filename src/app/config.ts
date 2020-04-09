import defaultLanguage from '@/app/lang/zh-cn';
import {JWTProvider} from '@/support/auth/jwt/provider';
import {mocks} from '@/app/api/v1/mock';

export const config = {
  i18n: {
    locales: [
      {name: 'zh-cn', aliases: ['zh']},
      {name: 'en-us'},
    ],
    defaultLocale: 'zh-cn',
    defaultLanguage,
  },
  api: {
    host: 'http://localhost:3000',
    headers: {},
    mock: {
      enable: true,
      stubs: mocks,
    },
    auth: {
      provider: new JWTProvider(),
      headerName: 'Authentication',
    },
  },
};
