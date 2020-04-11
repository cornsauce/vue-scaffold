import {Configurator} from '@/scaffold/core/configurator';

export type Stub = (baseUrl: string) => void;

export function configureMock(rootConfig: any): Configurator {
  return () => () => () => {
    const stubs: Stub[] = rootConfig.api.mock.stubs;

    stubs.forEach((stub) => {
      stub(rootConfig.api.baseUrl);
    });
  };
}
