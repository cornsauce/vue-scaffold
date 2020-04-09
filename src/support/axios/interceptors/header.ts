import {NullOr} from '@/support/utils/types';
import {RequestInterceptor, Request} from '../interceptor';

export class HeaderInterceptor extends RequestInterceptor {
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

  public request(request: Request) {
    request.headers = Object.assign({}, request.headers, this.getAll());
    return request;
  }
}

export const headerInterceptor = new HeaderInterceptor();
