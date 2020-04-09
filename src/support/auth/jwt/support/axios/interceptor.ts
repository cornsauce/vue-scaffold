import {Request} from '@/support/axios/interceptor';
import {MapHeaders, SimpleAuthInterceptor} from '@/support/axios/interceptors/auth';
import {JWTProvider, JWTSecret, JWTUser} from '@/support/auth/jwt';

export class JWTInterceptor extends SimpleAuthInterceptor<JWTProvider, JWTSecret, JWTUser> {
  constructor(provider: JWTProvider, user: () => JWTSecret, headerName: string) {
    super(provider, user, mapHeaders(headerName));
  }

  public request(request: Request): Request {
    return super.request(request);
  }
}

const mapHeaders: (headerName: string) => MapHeaders<JWTUser> = (headerName) => {
  return (secret) => {
    return new Map(Object.assign({[headerName]: secret.getToken()}).entries());
  };
};
