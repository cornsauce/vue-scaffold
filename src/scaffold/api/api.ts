import {AxiosInstance, AxiosResponse} from 'axios';
import {Autowire, Bean} from '@/scaffold/support/inversify';
import {Beans} from '@/scaffold/core/beans';

export type Request<T> = (path: () => string) => Promise<AxiosResponse<T>>;

@Bean()
export class AbstractAPI {
  @Autowire(Beans.API_AXIOS)
  protected $http!: AxiosInstance;
}
