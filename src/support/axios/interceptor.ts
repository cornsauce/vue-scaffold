import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export type Request = AxiosRequestConfig;
export type Response = AxiosResponse;

export type UninstallInterceptor = () => void;
export type UseInterceptor = (instance: AxiosInstance) => UninstallInterceptor;

interface InterceptorLifecycle {
  onInstalled(instance: AxiosInstance): void;

  onUninstall(): void;
}

interface AsInterceptor {
  asInterceptor(): Interceptor;
}

export abstract class Interceptor implements InterceptorLifecycle {
  public abstract request(request: Request): Request | Promise<Request>;

  public abstract respond(response: Response): Response | Promise<Response>;

  public requestError(error: any): any {
    return error;
  }

  public respondError(error: any): any {
    return error;
  }

  public onInstalled(instance: AxiosInstance): void {
  }

  public onUninstall(): void {
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

  public onInstalled(instance: AxiosInstance): void {
    this.interceptor.onInstalled(instance);
  }

  public onUninstall(): void {
    this.interceptor.onUninstall();
  }
}

export abstract class RequestInterceptor implements AsInterceptor, InterceptorLifecycle {
  public abstract request(request: Request): Request | Promise<Request>;

  public error(error: any): any {
    return error;
  }

  public onInstalled(instance: AxiosInstance): void {
  }

  public onUninstall(): void {
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

  public onInstalled(instance: AxiosInstance): void {
    this.interceptor.onInstalled(instance);
  }

  public onUninstall(): void {
    this.interceptor.onUninstall();
  }
}

export abstract class ResponseInterceptor implements AsInterceptor, InterceptorLifecycle {
  public abstract respond(request: Response): Response | Promise<Response>;

  public error(error: any): any {
    return error;
  }

  public onInstalled(instance: AxiosInstance): void {
  }

  public onUninstall(): void {
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
    interceptor.onInstalled(instance);

    return () => {
      interceptor.onUninstall();
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
