import {AxiosInstance, AxiosResponse} from 'axios';
import {Autowire, Provide} from '@/scaffold/support/inversify';

export type Request<T> = (path: () => string) => Promise<AxiosResponse<T>>;

@Provide()
export class AbstractAPI {
  @Autowire('api.axios')
  protected client!: AxiosInstance;
}
