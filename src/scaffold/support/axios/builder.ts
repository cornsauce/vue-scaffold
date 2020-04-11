import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {AbstractInterceptor, useInterceptor} from './interceptor';

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
    // before build phase
    this.extensions.forEach((extension) => extension(this));

    //
    // notice: the [overrideRequestConfig] will modify the [request] property.
    //  To avoid the invalid configuration problem, the 'before build phase' must
    //  before the instance has instantiated.
    const axios = Axios.create(mergeRequestConfig(this.request));

    // build phase
    this.buildExtensions.forEach((extension) => extension(this, axios));

    //
    // TODO:
    //  1. add after-build phase hook

    return axios;
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
  interceptor: AbstractInterceptor,
  acceptUninstaller?: (uninstall: () => void) => void,
): Extension {
  return (builder) => {
    builder.addBuildExtension((_, axios) => {
      const uninstaller = useInterceptor(interceptor)(axios);

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
