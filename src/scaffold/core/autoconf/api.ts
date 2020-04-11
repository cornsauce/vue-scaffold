import {Configurator} from '@/scaffold/core/configurator';
import {AxiosFactory} from '@/scaffold/support/axios';
import {addInterceptor, Extension, overrideRequestConfig} from '@/scaffold/support/axios/builder';
import {AbstractInterceptor} from '@/scaffold/support/axios/interceptor';
import {Beans} from '@/scaffold/core/beans';
import {JWTManager} from '@/scaffold/support/auth/jwt';
import {JWTInterceptor} from '@/scaffold/support/auth/jwt/support/axios/interceptor';
import {BEAN_REGISTERED} from '@/scaffold/core/application';
import {AxiosInstance} from 'axios';
import {AuthManagerInterface} from '@/scaffold/auth';
import {setupMock} from '@/scaffold/support/mock/mock';
import {Log} from '@/scaffold/log';

export type Stub = (baseUrl: string) => void;

export function configureAPI(rootConfig: App.Config): Configurator {
  return (app) => {
    const axiosFactory = new AxiosFactory();
    const extensions: Extension[] = [];
    extensions.push(
      overrideRequestConfig({
        baseURL: rootConfig.api.baseUrl,
        headers: rootConfig.api.headers,
      }),
    );
    rootConfig.axios.interceptors?.forEach((interceptor: AbstractInterceptor) => {
      extensions.push(addInterceptor(interceptor));
    });
    const axios = axiosFactory.createWithExtensions(extensions);

    app.registerBean(Beans.API_AXIOS, axios);
    app.registerBean(Beans.API, app.getContainer().resolve(rootConfig.api.class));

    app.getEventEmitter().addListener(BEAN_REGISTERED, ({bean, value}) => {
      if (bean === Beans.AUTH_MANAGER) {
        Log.d(bean, value);
        if (
          rootConfig.auth.enabled &&
          rootConfig.api.auth.enabled &&
          rootConfig.api.auth.interceptor.enabled) {

          const axios = app.getContainer().get<AxiosInstance>(Beans.API_AXIOS);
          const manager = value as AuthManagerInterface;

          if (manager instanceof JWTManager) {
            const jwtInterceptor = new JWTInterceptor({
              manager,
              secret: () => manager.getCurrentUser().getSecret(),
              headerName: rootConfig.api.auth.headerName,
            });

            axios.interceptorManager!.install(jwtInterceptor.asInterceptor());
          }
        }
      }
    });

    return () => () => {
    };
  };
}

export function configureAPIAuth(rootConfig: App.Config): Configurator {
  return () => {

    return () => () => {
    };
  };
}

export function configureAPIMock(rootConfig: App.Config): Configurator {
  return () => {
    if (rootConfig.api.mock.enabled) {
      setupMock({
        timeout: rootConfig.api.mock.timeout,
      });

      const stubs: Stub[] = rootConfig.api.mock.stubs;
      stubs.forEach((stub) => {
        stub(rootConfig.api.baseUrl);
      });
    }

    return () => () => {

    };
  };
}
