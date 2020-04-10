import Vue from 'vue';
import {Configurator} from '@/core/configurator';
import {Application} from '@/core/application';
import {AxiosFactory} from '@/support/axios';
import {overrideRequestConfig} from '@/support/axios/builder';
import {enableIoc} from './vueioc';
import {enableRouter} from './router';
import {enableI18n} from './i18n';
import {enableVuex} from './vuex';
import {enableMock} from './api';
import {enableVue} from './vue';
import {assembleRouter} from '@/router';
import {assembleI18n} from '@/i18n';
import {assembleStore} from '@/store';

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
