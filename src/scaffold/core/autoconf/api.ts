import {Configurator} from '@/scaffold/core/configurator';

export type Stub = (baseUrl: string) => void;

export function enableMock(rootConfig: any): Configurator {
  const stubs: Stub[] = rootConfig.api.mock.stubs;

  return () => () => () => {
    stubs.forEach((stub) => {
      stub(rootConfig.api.baseUrl);
    });
  };
}
