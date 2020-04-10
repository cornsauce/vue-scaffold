import {AxiosRequestConfig, AxiosInstance} from 'axios';
import {Builder, Extension, overrideRequestConfig} from './builder';

export class AxiosFactory {
  public create(defaultRequestConfig?: AxiosRequestConfig): AxiosInstance {
    const builder = new Builder();

    builder.addExtension(overrideRequestConfig(defaultRequestConfig ?? {}));

    return builder.build();
  }

  public createWithBuilder(configureBuilder: (builder: Builder) => Builder): AxiosInstance {
    return configureBuilder(new Builder()).build();
  }

  public createWithExtensions(extensions: Extension[]): AxiosInstance {
    const builder = new Builder();

    extensions.forEach((extension) => builder.addExtension(extension));

    return builder.build();
  }
}
