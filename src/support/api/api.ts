import {AxiosInstance, AxiosResponse} from 'axios';
import {Application} from '@/core/application';
import {Autowire, Provide} from '@/support/inversify';

export type Request<T> = (path: () => string) => Promise<AxiosResponse<T>>;

@Provide()
export class AbstractAPI {
  @Autowire('api.axios')
  protected client!: AxiosInstance;
}
