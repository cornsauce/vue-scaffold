import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export type Request = AxiosRequestConfig;
export type Response = AxiosResponse;

export type UseInterceptor = (instance: AxiosInstance) => () => void;

interface Lifecycle {
  installed(instance: AxiosInstance): void;

  beforeUninstall(): void;
}

interface AsInterceptor {
  asInterceptor(): Interceptor;
}

export abstract class Interceptor implements Lifecycle {
  public abstract request(request: Request): Request | Promise<Request>;

  public abstract respond(response: Response): Response | Promise<Response>;

  public requestError(error: any): any {
    return error;
  }

  public respondError(error: any): any {
    return error;
  }

  public installed(instance: AxiosInstance): void {
  }

  public beforeUninstall(): void {
  }
}

class RequestInterceptorAdapter extends Interceptor {
  private interceptor: RequestInterceptor;

  constructor(interceptor: RequestInterceptor) {
    super();

    this.interceptor = interceptor;
  }

  public request(request: Request): Request | Promise<Request> {
    return this.interceptor.request(request);
  }

  public respond(response: Response): Response | Promise<Response> {
    return response;
  }

  public requestError(error: any): any {
    return this.interceptor.error(error);
  }

  public respondError(error: any): any {
    return error;
  }

  public installed(instance: AxiosInstance): void {
    this.interceptor.installed(instance);
  }

  public beforeUninstall(): void {
    this.interceptor.beforeUninstall();
  }
}

export abstract class RequestInterceptor implements AsInterceptor, Lifecycle {
  public abstract request(request: Request): Request | Promise<Request>;

  public error(error: any): any {
    return error;
  }

  public installed(instance: AxiosInstance): void {
  }

  public beforeUninstall(): void {
  }

  public asInterceptor(): Interceptor {
    return new RequestInterceptorAdapter(this);
  }
}

class ResponseInterceptorAdapter extends Interceptor {
  private interceptor: ResponseInterceptor;

  constructor(interceptor: ResponseInterceptor) {
    super();

    this.interceptor = interceptor;
  }

  public request(request: Request): Request | Promise<Request> {
    return request;
  }

  public respond(response: Response): Response | Promise<Response> {
    return this.interceptor.respond(response);
  }

  public requestError(error: any): any {
    return error;
  }

  public respondError(error: any): any {
    return this.interceptor.error(error);
  }

  public installed(instance: AxiosInstance): void {
    this.interceptor.installed(instance);
  }

  public beforeUninstall(): void {
    this.interceptor.beforeUninstall();
  }
}

export abstract class ResponseInterceptor implements AsInterceptor, Lifecycle {
  public abstract respond(response: Response): Response | Promise<Response>;

  public error(error: any): any {
    return error;
  }

  public installed(instance: AxiosInstance): void {
  }

  public beforeUninstall(): void {
  }

  public asInterceptor(): Interceptor {
    return new ResponseInterceptorAdapter(this);
  }
}

export function useInterceptor(interceptor: Interceptor): UseInterceptor {
  return (instance) => {
    const requestInterceptorId = instance.interceptors.request.use(
      (request) => interceptor.request(request),
      (error) => interceptor.requestError(error),
    );
    const responseInterceptorId = instance.interceptors.response.use(
      (response) => interceptor.respond(response),
      (error) => interceptor.respondError(error),
    );
    interceptor.installed(instance);

    return () => {
      interceptor.beforeUninstall();
      instance.interceptors.request.eject(requestInterceptorId);
      instance.interceptors.response.eject(responseInterceptorId);
    };
  };
}

export function useRequestInterceptor(interceptor: RequestInterceptor): UseInterceptor {
  return useInterceptor(interceptor.asInterceptor());
}

export function useResponseInterceptor(interceptor: ResponseInterceptor): UseInterceptor {
  return useInterceptor(interceptor.asInterceptor());
}
