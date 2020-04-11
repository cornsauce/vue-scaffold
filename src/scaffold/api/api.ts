import {AxiosInstance, AxiosResponse} from 'axios';
import {Autowire, Bean} from '@/scaffold/support/inversify';
import {BeanConstant} from '@/scaffold/core/constant';

export type Request<T> = (path: () => string) => Promise<AxiosResponse<T>>;

@Bean()
export class AbstractAPI {
  @Autowire(BeanConstant.API_AXIOS)
  protected $http!: AxiosInstance;
}
