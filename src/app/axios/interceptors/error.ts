import {AbstractResponseInterceptor, Response, Next} from '@/scaffold/support/axios/interceptor';

export class ErrorHandleInterceptor extends AbstractResponseInterceptor {
  constructor() {
    super();
  }

  public respond(response: Response, next: Next<Response>): Promise<Response> {
    if (response.status !== 200) {
      return Promise.reject('remote server is responded with error status');
    }

    if (
      typeof response.data.error === 'undefined' ||
      response.data.error === null
    ) {
      return next(response);
    }

    return Promise.reject('remote server is responded with request error');
  }
}
