import {ResponseInterceptor, Response, Next} from '@/scaffold/support/axios/interceptor';

export class ErrorHandleInterceptor extends ResponseInterceptor {
  constructor() {
    super();
  }

  public respond(response: Response, next: Next<Response>): Promise<Response> {
    if (response.status !== 200) {
      return Promise.reject('remote server is responded with error status');
    }

    if (response.data.error) {
      return Promise.reject('remote server is responded with request error');
    }

    return next(response);
  }
}
