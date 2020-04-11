import {AbstractRequestInterceptor, Request, Next} from '../interceptor';
import {AuthManagerInterface, SecretInterface, UserInterface} from '@/scaffold/auth';

export type MapHeaders<T extends UserInterface> = (user: T) => Map<string, string>;

export interface SimpleAuthInterceptorOptions<UserType extends UserInterface> {
  manager: AuthManagerInterface;
  secret: () => SecretInterface;
  mapHeaders: MapHeaders<UserType>;
}

export class SimpleAuthInterceptor<UserType extends UserInterface> extends AbstractRequestInterceptor {
  private readonly options: SimpleAuthInterceptorOptions<UserType>;

  constructor(options: SimpleAuthInterceptorOptions<UserType>) {
    super();

    this.options = options;
  }

  public async request(request: Request, next: Next<Request>): Promise<Request> {
    const user = await this.options.manager.resolve(this.options.secret()) as UserType;

    this.options.mapHeaders(user)
      .forEach((value, headerName) => {
        request.headers[headerName] = value;
      });

    return next(request);
  }
}
