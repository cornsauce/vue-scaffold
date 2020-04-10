import {ResponseInterceptor, Response} from '@/scaffold/support/axios/interceptor';

export class ErrorHandleInterceptor extends ResponseInterceptor {
  public respond(response: Response): Response | Promise<Response> {
    if (response.status !== 200) {
      throw new Error('remote server is responded with error status');
    }

    if (response.data.error) {
      throw new Error('remote server is responded with request error');
    }

    return response;
  }
}
