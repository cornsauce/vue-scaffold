import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export type Request = AxiosRequestConfig;
export type Response = AxiosResponse;

type Pack<T> = (next: Next<T>, interceptor: Interceptor) => Next<T>;
export type Next<T> = (value: T) => Promise<T>;
export type ApplyInterceptor = (instance: AxiosInstance) => () => void;

interface Lifecycle {
  installed(axios: AxiosInstance): void;

  beforeUninstall(axios: AxiosInstance): void;
}

interface AsInterceptor {
  asInterceptor(): Interceptor;
}

export abstract class Interceptor implements Lifecycle {
  public abstract request(request: Request, next: Next<Request>): Promise<Request>;

  public requestError(error: any, next: Next<any>): Promise<any> {
    return next(error);
  }

  public abstract respond(response: Response, next: Next<Response>): Promise<Response>;

  public respondError(error: any, next: Next<any>): Promise<any> {
    return next(error);
  }

  public installed(axios: AxiosInstance): void {
  }

  public beforeUninstall(axios: AxiosInstance): void {
  }
}

class RequestInterceptorAdapter extends Interceptor {
  private interceptor: RequestInterceptor;

  constructor(interceptor: RequestInterceptor) {
    super();

    this.interceptor = interceptor;
  }

  public request(request: Request, next: Next<Request>): Promise<Request> {
    return this.interceptor.request(request, next);
  }

  public requestError(error: any, next: Next<any>): Promise<any> {
    return this.interceptor.error(error, next);
  }

  public async respond(response: Response, next: Next<Response>): Promise<Response> {
    return next(response);
  }

  public respondError(error: any, next: Next<any>): Promise<any> {
    return next(error);
  }

  public installed(axios: AxiosInstance): void {
    this.interceptor.installed(axios);
  }

  public beforeUninstall(axios: AxiosInstance): void {
    this.interceptor.beforeUninstall(axios);
  }
}

export abstract class RequestInterceptor implements AsInterceptor, Lifecycle {
  public abstract request(request: Request, next: Next<Request>): Promise<Request>;

  public error(error: any, next: Next<any>): Promise<any> {
    return next(error);
  }

  public installed(axios: AxiosInstance): void {
  }

  public beforeUninstall(axios: AxiosInstance): void {
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

  public request(request: Request, next: Next<Request>): Promise<Request> {
    return next(request);
  }

  public requestError(error: any, next: Next<any>): Promise<any> {
    return next(error);
  }

  public respond(response: Response, next: Next<Response>): Promise<Response> {
    return this.interceptor.respond(response, next);
  }

  public respondError(error: any, next: Next<any>): Promise<any> {
    return this.interceptor.error(error, next);
  }

  public installed(axios: AxiosInstance): void {
    this.interceptor.installed(axios);
  }

  public beforeUninstall(axios: AxiosInstance): void {
    this.interceptor.beforeUninstall(axios);
  }
}

export abstract class ResponseInterceptor implements AsInterceptor, Lifecycle {
  public abstract respond(response: Response, next: Next<Response>): Promise<Response>;

  public error(error: any, next: Next<any>): Promise<any> {
    return next(error);
  }

  public installed(axios: AxiosInstance): void {
  }

  public beforeUninstall(axios: AxiosInstance): void {
  }

  public asInterceptor(): Interceptor {
    return new ResponseInterceptorAdapter(this);
  }
}

export class InterceptorManager {
  private readonly axios: AxiosInstance;
  private readonly interceptors: Set<Interceptor>;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.interceptors = new Set();

    this.axios.interceptors.request.use(
      (request) => this.onRequest(request),
      (error) => this.onRequestError(error),
    );
    this.axios.interceptors.response.use(
      (response) => this.onResponse(response),
      (error) => this.onResponseError(error),
    );
  }

  public install(interceptor: Interceptor): () => void {
    this.interceptors.add(interceptor);
    interceptor.installed(this.axios);

    return () => {
      interceptor.beforeUninstall(this.axios);
      this.interceptors.delete(interceptor);
    };
  }

  private onRequest(request: Request): Promise<Request> {
    const fn = (interceptor: Interceptor, request: Request, next: Next<Request>) => interceptor.request(request, next);
    return next<Request>(Array.from(this.interceptors), pack(fn))(request);
  }

  private onRequestError(error: any): Promise<any> {
    const fn = (interceptor: Interceptor, error: Response, next: Next<any>) => interceptor.respondError(error, next);
    return next<any>(Array.from(this.interceptors), pack(fn))(error);
  }

  private onResponse(response: Response): Promise<Response> {
    const fn = (interceptor: Interceptor, response: Response, next: Next<Response>) => interceptor.respond(response, next);
    return next<Response>(Array.from(this.interceptors), pack(fn))(response);
  }

  private async onResponseError(error: any): Promise<any> {
    const fn = (interceptor: Interceptor, error: Response, next: Next<any>) => interceptor.respondError(error, next);
    return next<any>(Array.from(this.interceptors), pack(fn))(error);
  }
}

export function useInterceptor(interceptor: Interceptor): ApplyInterceptor {
  return (axios) => {
    if (!axios.interceptorManager) {
      axios.interceptorManager = new InterceptorManager(axios);
    }
    const interceptorManager = axios.interceptorManager;

    return interceptorManager.install(interceptor);
  };
}

export function useRequestInterceptor(interceptor: RequestInterceptor): ApplyInterceptor {
  return useInterceptor(interceptor.asInterceptor());
}

export function useResponseInterceptor(interceptor: ResponseInterceptor): ApplyInterceptor {
  return useInterceptor(interceptor.asInterceptor());
}

const pack = <T>(fn: (interceptor: Interceptor, value: T, next: Next<T>) => ReturnType<Next<T>>): Pack<T> => {
  return (next, interceptor) => {
    return (value) => Promise.resolve(fn(interceptor, value, next));
  };
};

const next = <T>(interceptors: Interceptor[], pack: Pack<T>) => {
  return interceptors.reverse().reduce<Next<T>>(pack, (value: T) => Promise.resolve(value));
};
