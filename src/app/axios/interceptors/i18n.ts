import {AbstractRequestInterceptor, Request, Next} from '@/scaffold/support/axios/interceptor';

interface I18nInterceptorOptions {
  currentLocale: () => string;
}

export class I18nInterceptor extends AbstractRequestInterceptor {
  private options: I18nInterceptorOptions;

  constructor(options: I18nInterceptorOptions) {
    super();

    this.options = options;
  }

  public request(request: Request, next: Next<Request>): Promise<Request> {
    request.headers['Accept-Language'] = this.options.currentLocale();
    return next(request);
  }
}
