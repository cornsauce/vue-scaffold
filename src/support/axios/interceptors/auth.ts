import {RequestInterceptor, Request} from '../interceptor';
import {Provider, Secret, User} from '@/support/auth';

export type MapHeaders<T extends User> = (user: T) => Map<string, string>;

export interface SimpleAuthInterceptorOptions<ProviderType extends Provider<SecretType, UserType>, SecretType extends Secret, UserType extends User> {
  provider: ProviderType;
  secret: () => SecretType;
  mapHeaders: MapHeaders<UserType>;
}

export class SimpleAuthInterceptor<ProviderType extends Provider<SecretType, UserType>, SecretType extends Secret, UserType extends User> extends RequestInterceptor {
  private provider: ProviderType;
  private secret: () => SecretType;
  private mapHeaders: MapHeaders<UserType>;

  constructor(options: SimpleAuthInterceptorOptions<ProviderType, SecretType, UserType>) {
    super();

    this.provider = options.provider;
    this.secret = options.secret;
    this.mapHeaders = options.mapHeaders;
  }

  public request(request: Request): Request {
    this.mapHeaders(this.provider.for(this.secret()))
      .forEach((value, headerName) => {
        request.headers[headerName] = value;
      });

    return request;
  }
}
