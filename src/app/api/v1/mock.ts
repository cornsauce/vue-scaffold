import Mock from 'mockjs';
import {signIn, signUp} from './path';
import {Stub} from '../../../support/autoconf/api';

const signInStub: Stub = () => {
  Mock.mock(signIn(), {
    error: null,
    data: {
      userInfo: {
        id: Mock.Random.integer(1e6, 1e7 - 1),
        nickname: Mock.Random.name(),
      },
    },
  });
};

const signUpStub: Stub = () => {
  Mock.mock(signUp(), {
    error: null,
    data: null,
  });
};

export const stubs = [
  signInStub,
  signUpStub,
];
