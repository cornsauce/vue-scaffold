import {NullOr} from '@/scaffold/utils/types';
import {AbstractRequestInterceptor, Request, Next} from '../interceptor';

export class HeaderInterceptor extends AbstractRequestInterceptor {
  private headers: Map<string, string>;

  constructor() {
    super();

    this.headers = new Map();
  }

  public get(name: string): NullOr<string> {
    return this.headers.get(name);
  }

  public getAll(): { [key: string]: string } {
    return Object.fromEntries(this.headers);
  }

  public clear() {
    this.headers = new Map();
  }

  public append(name: string, value: string) {
    this.headers.set(name, value);
  }

  public remove(name: string) {
    this.headers.delete(name);
  }

  public request(request: Request, next: Next<Request>): Promise<Request> {
    request.headers = Object.assign({}, request.headers, this.getAll());

    return next(request);
  }
}

export const headerInterceptor = new HeaderInterceptor();
