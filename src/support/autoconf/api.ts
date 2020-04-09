import {Configurator} from '@/core/configurator';

export type Stub = () => void;

export function enableMock(rootConfig: any): Configurator {
  const stubs: Stub[] = rootConfig.api.mock.stubs;

  return () => () => () => {
    stubs.forEach((stub) => {
      stub();
    });
  };
}
