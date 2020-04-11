import Mock from 'mockjs';
import {authorize, permissions, signIn, signUp} from './path';
import {Stub} from '@/scaffold/core/autoconf/api';

const signInStub: Stub = (baseUrl) => {
  Mock.mock(baseUrl + signIn(), {
    error: {},
    data: {
      userInfo: {
        id: Mock.Random.integer(1e6, 1e7 - 1),
        nickname: Mock.Random.name(),
      },
    },
  });
};

const signUpStub: Stub = (baseUrl) => {
  Mock.mock(baseUrl + signUp(), {
    error: null,
    data: null,
  });
};

const permissionsStub: Stub = (baseUrl) => {
  Mock.mock(baseUrl + permissions(), {
    error: null,
    data: {
      rules: [{
        role: 'admin',
        policies: [{
          perm: 'article.post',
          granted: true,
        }, {
          perm: 'article.view',
          granted: true,
        }, {
          perm: 'article.edit',
          granted: true,
        }, {
          perm: 'article.delete',
          granted: true,
        }],
      }, {
        role: 'author',
        policies: [{
          perm: 'article.post',
          granted: false,
        }, {
          perm: 'article.view',
          granted: true,
        }, {
          perm: 'article.edit',
          granted: true,
        }, {
          perm: 'article.delete',
          granted: true,
        }],
      }, {
        role: '*',
        policies: [{
          perm: 'article.post',
          granted: false,
        }, {
          perm: 'article.view',
          granted: true,
        }, {
          perm: 'article.edit',
          granted: false,
        }, {
          perm: 'article.delete',
          granted: false,
        }],
      }],
    },
  });
};

const authorizeStub: Stub = (baseUrl) => {
  Mock.mock(baseUrl + authorize(), {
    error: null,
    data: null,
  });
};

export const stubs = [
  signInStub,
  signUpStub,
  permissionsStub,
  authorizeStub,
];
