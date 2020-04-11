import {Configurator} from '@/scaffold/core/application';

export function configureEnvironment(rootConfig: App.Config): Configurator {
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
