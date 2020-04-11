import {Store} from 'vuex';
import VueRouter from 'vue-router';
import VueI18n, {LocaleMessage} from 'vue-i18n';
import {Application} from './core/application';
import {AbstractInterceptor} from '@/scaffold/support/axios/interceptor';
import {Stub} from '@/scaffold/core/autoconf/api';
import {JWTEndpointInterface, JWTGuest} from '@/scaffold/support/auth/jwt';
import {AbstractAPI} from '@/scaffold/api';

type AssembleComponent<T> = (app: Application, state: any, rootConfig: App.Config) => T;

declare global {
  namespace Scaffold {
    type AssembleRouter = AssembleComponent<(config: any) => VueRouter>;
    type AssembleStore<StateType> = AssembleComponent<(config: any) => Store<StateType>>;
    type AssembleI18n = AssembleComponent<(config: any) => VueI18n>;
  }

  namespace App {
    interface EnableOptions {
      enabled: boolean;
    }

    interface VueOptions {
      productionTip: boolean;
    }

    interface VuexOptions {
    }

    interface RouterOptions {
    }

    interface Locale {
      name: string;
      aliases?: string[];
    }

    interface I18nOptions {
      locales: Locale[];
      defaultLocale: string;
      defaultLanguage: LocaleMessage;
    }

    interface AxiosOptions {
      interceptors?: AbstractInterceptor[];
    }

    interface MockOptions {
      timeout?: string | number;
      stubs: Stub[];
    }

    interface JWTAuthOptions {
      driver: 'jwt';
      endpoint: new (...args: any[]) => JWTEndpointInterface;
      guest: JWTGuest;
    }

    interface APIAuthInterceptorOptions {
    }

    interface APIAuthOptions {
      headerName: string;
      interceptor: EnableOptions & APIAuthInterceptorOptions;
    }

    interface APIOptions {
      class: new (...args: any[]) => AbstractAPI;
      baseUrl: string;
      headers: { [key: string]: string };
      mock: EnableOptions & MockOptions;
      auth: EnableOptions & APIAuthOptions;
    }

    interface Config {
      vue: VueOptions;
      vuex: EnableOptions & VuexOptions;
      router: EnableOptions & RouterOptions;
      i18n: EnableOptions & I18nOptions;
      axios: AxiosOptions;
      api: APIOptions;
      auth: EnableOptions & JWTAuthOptions;
    }
  }
}
