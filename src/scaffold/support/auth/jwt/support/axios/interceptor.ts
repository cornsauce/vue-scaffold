import {Request, Next} from '@/scaffold/support/axios/interceptor';
import {SimpleAuthInterceptor, MapHeaders} from '@/scaffold/support/axios/interceptors/auth';
import {JWTManager, JWTSecretInterface, JWTUserInterface} from '@/scaffold/support/auth/jwt';

export interface JWTInterceptorOptions {
  manager: JWTManager;
  secret: () => JWTSecretInterface;
  headerName: string;
}

export class JWTInterceptor extends SimpleAuthInterceptor<JWTUserInterface> {
  constructor(options: JWTInterceptorOptions) {
    super({
      manager: options.manager,
      secret: options.secret,
      mapHeaders: mapHeaders(options.headerName),
    });
  }

  public request(request: Request, next: Next<Request>): Promise<Request> {
    return super.request(request, next);
  }
}

const mapHeaders: (headerName: string) => MapHeaders<JWTUserInterface> = (headerName) => {
  return (user) => {
    return new Map(Object.entries(Object.assign({}, {[headerName]: user.getSecret().getToken()})));
  };
};
