import {RequestInterceptor, Request} from '../interceptor';
import {Provider, Secret, User} from '@/support/auth';

export type MapHeaders<T extends User> = (secret: T) => Map<string, string>;

export class SimpleAuthInterceptor<ProviderType extends Provider<UserType, SecretType>, UserType extends Secret, SecretType extends User> extends RequestInterceptor {
  private provider: ProviderType;
  private user: () => UserType;
  private mapHeaders: MapHeaders<SecretType>;

  constructor(provider: ProviderType, user: () => UserType, mapHeaders: MapHeaders<SecretType>) {
    super();

    this.provider = provider;
    this.user = user;
    this.mapHeaders = mapHeaders;
  }

  public request(request: Request): Request {
    this.mapHeaders(this.provider.for(this.user()))
      .forEach((value, headerName) => {
        request.headers[headerName] = value;
      });

    return request;
  }
}
