import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {Application} from '@/scaffold/core/application';
import {AxiosFactory} from '@/scaffold/support/axios';
import {overrideRequestConfig} from '@/scaffold/support/axios/builder';
import {enableIoc, enableRouter, enableI18n, enableVuex, enableVue} from './vue';
import {enableMock} from './api';
import {assembleRouter} from '@/app/router';
import {assembleI18n} from '@/app/i18n';
import {assembleStore} from '@/app/store';

type GenConfiguratorsFunc = (config: any) => (provide: (options: any) => Vue) => Configurator[];

function enableAPIAxios(rootConfig: any): Configurator {
  return (app) => {
    const axiosFactory = new AxiosFactory();
    const axios = axiosFactory.createWithExtensions([
      overrideRequestConfig({
        baseURL: rootConfig.api.baseUrl,
        headers: rootConfig.api.headers,
      }),
    ]);

    app.getContainer().bind('api.axios').toConstantValue(axios);

    return () => () => {
    };
  };
}

function enableEnvironment(rootConfig: any): Configurator {
  return (app) => {
    return (state) => {
      state.autoconf = {
        vueOptions: {},
      };

      return () => {
      };
    };
  };
}

export const genConfigurators: GenConfiguratorsFunc = (config) => (provide) => {
  const configurators = [];

  configurators.push(enableEnvironment(config));
  configurators.push(enableAPIAxios(config));
  configurators.push(enableIoc(config));

  if (config.router.enabled) {
    configurators.push(enableRouter(config, assembleRouter));
  }

  if (config.i18n.enabled) {
    configurators.push(enableI18n(config, assembleI18n));
  }

  if (config.vuex.enabled) {
    configurators.push(enableVuex(config, assembleStore));
  }

  if (config.api.mock.enabled) {
    configurators.push(enableMock(config));
  }

  configurators.push(enableVue(config, provide));

  return configurators;
};

export const apply: (app: Application) => (...configurators: Configurator[]) => void = (app) => {
  return (...configurators) => {
    configurators.forEach((configurator) => {
      app.configure(configurator);
    });
  };
};
