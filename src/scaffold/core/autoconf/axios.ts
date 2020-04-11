import {Configurator} from '@/scaffold/core/configurator';
import {AxiosFactory} from '@/scaffold/support/axios';
import {Interceptor} from '@/scaffold/support/axios/interceptor';
import {addInterceptor, overrideRequestConfig} from '@/scaffold/support/axios/builder';

export function configureAxios(rootConfig: any): Configurator {
  return () => () => () => {
  };
}

export function configureAPIAxios(rootConfig: any): Configurator {
  return (app) => {
    const axiosFactory = new AxiosFactory();
    const axios = axiosFactory.createWithExtensions([
      overrideRequestConfig({
        baseURL: rootConfig.api.baseUrl,
        headers: rootConfig.api.headers,
      }),
      ...(rootConfig.axios.interceptors?.map((interceptor: Interceptor) => addInterceptor(interceptor)) || []),
    ]);

    app.getContainer().bind('api.axios').toConstantValue(axios);

    return () => () => {
    };
  };
}
