import {Configurator} from '@/scaffold/core/configurator';

export function enableEnvironment(rootConfig: any): Configurator {
  return () => {
    return (state) => {
      state.autoconf = {
        vueOptions: {},
      };

      return () => {
      };
    };
  };
}
