//
// TODO:
//  1. auto-wiring problem in api and auth endpoint (see [JWTEndpoint])

import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {Application} from '@/scaffold/core/application';
import {configureEnvironment} from './environment';
import {configureApplication} from './application';
import {configureEventBus} from './eventBus';
import {configureAxios} from './axios';
import {configureAPI, configureAPIMock, configureAPIAuth} from './api';
import {configureIoc, configureRouter, configureI18n, configureVuex, configureVue} from './vue';
import {assembleRouter} from '@/app/router';
import {assembleI18n} from '@/app/i18n';
import {assembleStore} from '@/app/store';
import {configureAuth} from '@/scaffold/core/autoconf/auth';

type GenConfiguratorsFunc = (config: App.Config) => (provideVue: (options: any) => Vue) => Configurator[];

export const genConfigurators: GenConfiguratorsFunc = (config) => (provideVue) => {
  const configurators = [];

  //
  // Prepare the base environment
  configurators.push(configureEnvironment(config));

  //
  // Inject the application abilities
  configurators.push(configureApplication(config));
  configurators.push(configureEventBus(config));

  //
  // Inject the network abilities
  configurators.push(configureAxios(config));

  //
  // Inject Vue abilities
  configurators.push(configureIoc(config));
  configurators.push(configureRouter(config, assembleRouter));
  configurators.push(configureI18n(config, assembleI18n));
  configurators.push(configureVuex(config, assembleStore));

  //
  // Inject the API management abilities
  configurators.push(configureAPI(config));
  configurators.push(configureAPIMock(config));
  configurators.push(configureAPIAuth(config));

  //
  // Inject the authorize abilities
  configurators.push(configureAuth(config));

  //
  // Prepare Vue environment
  configurators.push(configureVue(config, provideVue));

  return configurators;
};

export const apply: (app: Application) => (...configurators: Configurator[]) => void = (app) => {
  return (...configurators) => {
    configurators.forEach((configurator) => {
      app.configure(configurator);
    });
  };
};
