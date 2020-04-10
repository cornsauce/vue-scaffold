import Mock from 'mockjs';
import {signIn, signUp} from './path';
import {Stub} from '@/scaffold/core/autoconf/api';

const signInStub: Stub = (baseUrl) => {
  Mock.mock(baseUrl + signIn(), {
    error: null,
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

export const stubs = [
  signInStub,
  signUpStub,
];
