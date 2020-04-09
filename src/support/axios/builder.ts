import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {Interceptor, UninstallInterceptor, useInterceptor} from './interceptor';

export type Extension = (builder: Builder) => void;
export type BuildExtension = (builder: Builder, instance: AxiosInstance) => void;

export class Builder {
  public extensions: Extension[];
  public buildExtensions: BuildExtension[];
  public request: AxiosRequestConfig;

  constructor() {
    this.extensions = [];
    this.buildExtensions = [];
    this.request = {};
  }

  public addExtension(extension: Extension): void {
    this.extensions.push(extension);
  }

  public addBuildExtension(extension: BuildExtension): void {
    this.buildExtensions.push(extension);
  }

  public build(): AxiosInstance {
    this.extensions.forEach((extension) => extension(this));
    const instance = Axios.create(mergeRequestConfig(this.request));
    this.buildExtensions.forEach((extension) => extension(this, instance));

    return instance;
  }
}

function mergeRequestConfig(...configurations: AxiosRequestConfig[]): AxiosRequestConfig {
  return Object.assign({}, ...configurations);
}

export function addHeader(name: string, value: string): Extension {
  return (builder) => {
    builder.request.headers[name] = value;
  };
}

export function addInterceptor(
  interceptor: Interceptor,
  acceptUninstaller?: (ejector: UninstallInterceptor) => void,
): Extension {
  return (builder) => {
    builder.addBuildExtension((_, instance) => {
      const uninstaller = useInterceptor(interceptor)(instance);

      if (acceptUninstaller) {
        acceptUninstaller(uninstaller);
      }
    });
  };
}

export function overrideRequestConfig(config: AxiosRequestConfig): Extension {
  return (builder) => {
    builder.request = mergeRequestConfig(builder.request, config);
  };
}
