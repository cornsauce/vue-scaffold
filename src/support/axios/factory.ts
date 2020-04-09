import {AxiosRequestConfig} from 'axios';
import {Builder, Extension, overrideRequestConfig} from './builder';

export class AxiosFactory {
  public create(defaultRequestConfig?: AxiosRequestConfig) {
    const builder = new Builder();

    builder.addExtension(overrideRequestConfig(defaultRequestConfig ?? {}));

    return builder;
  }

  public createWithExtensions(extensions: Extension[]) {
    const builder = new Builder();

    extensions.forEach((extension) => builder.addExtension(extension));

    return builder;
  }
}
