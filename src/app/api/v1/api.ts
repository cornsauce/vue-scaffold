import {AbstractAPI, Request} from '@/scaffold/api';
import {Bean} from '@/scaffold/support/inversify';

@Bean()
export class API extends AbstractAPI {
  public signIn(username: string, password: string): Request<any> {
    return (path) => this.$http.get(path());
  }

  public signUp(username: string, password: string): Request<any> {
    return (path) => this.$http.post(path());
  }

  public permissions(): Request<any> {
    return (path) => this.$http.get(path());
  }

  public authorize(permission: string): Request<any> {
    return (path) => this.$http.get(path() + '?perm=' + permission);
  }
}
