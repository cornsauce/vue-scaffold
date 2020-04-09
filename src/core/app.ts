import Vue from 'vue';
import {EventEmitter} from 'events';
import {INJECTED} from '@/core/support/vue/plugin';

export type Configurator = (app: App) => void;

export class App {
  public readonly config: any;
  public vue?: Vue;
  private readonly eventEmitter: EventEmitter;
  private readonly configurators: Configurator[];

  constructor(config: any) {
    this.config = Object.seal(config);
    this.eventEmitter = new EventEmitter();
    this.configurators = [];
  }

  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public configure(configurator: Configurator): void {
    this.configurators.push(configurator);
  }

  public run() {
    this.configurators.forEach((configure) => configure(this));
  }
}

export function useVue(vue: () => Vue): Configurator {
  return (app) => {
    app.vue = vue();
  };
}
