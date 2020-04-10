import {AbstractAPI, Request} from '@/scaffold/api';
import {Provide} from '@/scaffold/support/inversify';
import {Injectable} from '@vue-ioc/core';
import { AxiosResponse } from 'axios';

@Provide()
export class API extends AbstractAPI {
  public signIn(username: string, password: string): Request<any> {
    return (path) => this.client.get(path());
  }

  public signUp(username: string, password: string): Request<any> {
    return (path) => this.client.post(path());
  }
}
