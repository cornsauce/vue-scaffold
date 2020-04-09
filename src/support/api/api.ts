import {AxiosInstance} from 'axios';
import {Inject} from '@vue-ioc/core';

export class AbstractAPI {
  @Inject()
  protected client!: AxiosInstance;
}
