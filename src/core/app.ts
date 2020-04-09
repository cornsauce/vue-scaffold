import '@/core/init';

import {EventEmitter} from 'events';
import {PluginManager} from './plugin/manager';
import {StaticConfigurator, Configurator, AssemblePhaseConfigurator, BuildPhaseConfigurator} from './configurator';

export interface AppOptions {
}

export class App {
  private static configurators: Set<StaticConfigurator> = new Set();

  public readonly options: AppOptions;
  public readonly state: any;
  private readonly eventEmitter: EventEmitter;
  private readonly pluginManager: PluginManager;
  private readonly assemblePhaseConfigurators: AssemblePhaseConfigurator[];
  private readonly buildPhaseConfigurators: BuildPhaseConfigurator[];

  constructor(options: AppOptions) {
    this.options = options;
    this.state = {};
    this.eventEmitter = new EventEmitter();
    this.pluginManager = new PluginManager({});
    this.assemblePhaseConfigurators = [];
    this.buildPhaseConfigurators = [];

    App.configurators.forEach((configure) => {
      this.configure(configure(options));
    });
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

  public configure(configure: Configurator): void {
    const assemblePhaseConfigurator = configure(this);
    this.assemblePhaseConfigurators.push(assemblePhaseConfigurator);
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
}


