import {Configurator} from '@/scaffold/core/configurator';

export function configureEnvironment(rootConfig: any): Configurator {
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
