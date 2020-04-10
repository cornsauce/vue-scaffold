import {Request, Next} from '@/scaffold/support/axios/interceptor';
import {MapHeaders, SimpleAuthInterceptor} from '@/scaffold/support/axios/interceptors/auth';
import {JWTProvider, JWTSecret, JWTUser} from '@/scaffold/auth/jwt';

export interface JWTInterceptorOptions {
  provider: JWTProvider;
  secret: () => JWTSecret;
  headerName: string;
}

export class JWTInterceptor extends SimpleAuthInterceptor<JWTProvider, JWTSecret, JWTUser> {
  constructor(options: JWTInterceptorOptions) {
    super({
      provider: options.provider,
      secret: options.secret,
      mapHeaders: mapHeaders(options.headerName),
    });
  }

  public request(request: Request, next: Next<Request>): Promise<Request> {
    return super.request(request, next);
  }
}

const mapHeaders: (headerName: string) => MapHeaders<JWTUser> = (headerName) => {
  return (user) => {
    return new Map(Object.assign({[headerName]: user.getToken()}).entries());
  };
};
