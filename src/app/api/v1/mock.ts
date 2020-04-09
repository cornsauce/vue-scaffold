import Mock from 'mockjs';
import {signIn, signUp} from './path';

export function mockSignIn() {
  Mock.mock(signIn(), {
    error: null,
    data: {
      userInfo: {
        id: Mock.Random.integer(1e6, 1e7 - 1),
        nickname: Mock.Random.name(),
      },
    },
  });
}

export function mockSignUp() {
  Mock.mock(signUp(), {
    error: null,
    data: null,
  });
}

export const mocks = [
  mockSignIn,
  mockSignUp,
];
