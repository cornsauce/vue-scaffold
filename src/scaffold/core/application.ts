import '@/scaffold/core/init';

import {EventEmitter} from 'events';
import {Container} from 'inversify';
import {PluginManager} from './plugin/manager';

export const BEAN_REGISTERED = '.scaffold.';

export type Selector<T> = (app: Application) => T;
export type BuildPhaseConfigurator = () => void;
export type AssemblePhaseConfigurator = (state: any) => BuildPhaseConfigurator;
export type ConfigurePhaseConfigurator = (app: Application) => AssemblePhaseConfigurator;
export type Configurator = ConfigurePhaseConfigurator;
export type StaticConfigurator = (options: ApplicationOptions) => Configurator;

export interface ApplicationOptions {

}

export class Application {
  private static configurators: Set<StaticConfigurator> = new Set();

  public readonly options: ApplicationOptions;
  public readonly state: any;
  private readonly eventEmitter: EventEmitter;
  private readonly pluginManager: PluginManager;
  private readonly container: Container;
  private readonly assemblePhaseConfigurators: AssemblePhaseConfigurator[];
  private readonly buildPhaseConfigurators: BuildPhaseConfigurator[];

  constructor(options: ApplicationOptions) {
    this.options = options;
    this.state = {};
    this.eventEmitter = new EventEmitter();
    this.pluginManager = new PluginManager({});
    this.container = new Container({autoBindInjectable: false});
    this.assemblePhaseConfigurators = [];
    this.buildPhaseConfigurators = [];

    this.applyStaticConfigurators();
    this.setupContainerHooks();
  }

  public static addConfigurator(configurator: StaticConfigurator): () => void {
    this.configurators.add(configurator);

    return () => {
      this.configurators.delete(configurator);
    };
  }

  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public getPluginManager(): PluginManager {
    return this.pluginManager;
  }

  public getContainer(): Container {
    return this.container;
  }

  public registerBean<T>(bean: string, value: T): void {
    this.getContainer().bind<T>(bean).toConstantValue(value);
    this.getEventEmitter().emit(BEAN_REGISTERED, {bean, value});
  }

  public configure(configure: Configurator): void {
    const assemblePhaseConfigurator = configure(this);
    this.assemblePhaseConfigurators.push(assemblePhaseConfigurator);
  }

  public select<T>(select: Selector<T>): () => T {
    return () => select(this);
  }

  public assemble(): void {
    const state: any = {};

    this.assemblePhaseConfigurators.forEach((configure) => {
      this.buildPhaseConfigurators.push(configure(state));
    });
  }

  public build() {
    this.buildPhaseConfigurators.forEach((configure) => {
      configure();
    });
  }

  public run() {
    this.assemble();
    this.build();
  }

  private applyStaticConfigurators(): void {
    Application.configurators.forEach((configure) => {
      this.configure(configure(this.options));
    });
  }

  private setupContainerHooks(): void {
  }
}


