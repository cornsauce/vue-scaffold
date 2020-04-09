import {RequestInterceptor, Request} from '../interceptor';
import {Provider, Secret, User} from '@/support/auth';

export type MapHeaders<T extends User> = (secret: T) => Map<string, string>;

export class SimpleAuthInterceptor<ProviderType extends Provider<SecretType, UserType>, SecretType extends Secret, UserType extends User> extends RequestInterceptor {
  private provider: ProviderType;
  private secret: () => SecretType;
  private mapHeaders: MapHeaders<UserType>;

  constructor(provider: ProviderType, secret: () => SecretType, mapHeaders: MapHeaders<UserType>) {
    super();

    this.provider = provider;
    this.secret = secret;
    this.mapHeaders = mapHeaders;
  }

  public request(request: Request): Request {
    this.mapHeaders(this.provider.for(this.secret()))
      .forEach((value, headerName) => {
        request.headers[headerName] = value;
      });

    return request;
  }
}
