import {AbstractRequestInterceptor, Request, Next} from '@/scaffold/support/axios/interceptor';
import {Application} from '@/scaffold/core/application';

interface I18nInterceptorOptions {
  app: Application;
}

export class I18nInterceptor extends AbstractRequestInterceptor {
  private options: I18nInterceptorOptions;

  constructor(options: I18nInterceptorOptions) {
    super();

    this.options = options;
  }

  public request(request: Request, next: Next<Request>): Promise<Request> {
    request.headers['Accept-Language'] = this.options.app.state.i18n.currentLocale;
    return next(request);
  }
}
