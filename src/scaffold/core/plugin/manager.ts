import {AbstractPlugin} from './plugin';

export interface PluginManagerOptions {
  beforePluginInstall?: (manager: PluginManager, plugin: AbstractPlugin) => void;
  pluginInstalled?: (manager: PluginManager, plugin: AbstractPlugin) => void;
  beforePluginActivate?: (manager: PluginManager, plugin: AbstractPlugin) => void;
  pluginActivated?: (manager: PluginManager, plugin: AbstractPlugin) => void;
  beforePluginDeactivate?: (manager: PluginManager, plugin: AbstractPlugin) => void;
  pluginDeactivated?: (manager: PluginManager, plugin: AbstractPlugin) => void;
  beforePluginUninstall?: (manager: PluginManager, plugin: AbstractPlugin) => void;
  pluginUninstalled?: (manager: PluginManager, plugin: AbstractPlugin) => void;
}

export interface PluginState {
  activated: boolean;
}

export class PluginManager {
  private readonly options: PluginManagerOptions;
  private readonly plugins: Set<AbstractPlugin>;
  private readonly pluginStates: Map<AbstractPlugin, PluginState>;

  constructor(options: PluginManagerOptions) {
    this.options = options;
    this.plugins = new Set();
    this.pluginStates = new Map();
  }

  public isPluginAdded(plugin: AbstractPlugin): boolean {
    return this.plugins.has(plugin);
  }

  public addPlugin(plugin: AbstractPlugin, activate?: boolean): () => void {
    this.throwIfPluginAdded(plugin);

    this.installPlugin(plugin);
    if (activate) {
      this.activatePlugin(plugin);
    }

    return () => {
      this.removePlugin(plugin);
    };
  }

  public removePlugin(plugin: AbstractPlugin): void {
    this.throwIfPluginNotAdded(plugin);

    this.deactivatePlugin(plugin);
    this.uninstallPlugin(plugin);
  }

  public activatePlugin(plugin: AbstractPlugin): void {
    this.throwIfPluginNotAdded(plugin);
    this.throwIfPluginActivated(plugin);

    this.notifyBeforePluginActivate(plugin);

    plugin.activate();

    this.notifyPluginActivated(plugin);
  }

  public deactivatePlugin(plugin: AbstractPlugin): void {
    this.throwIfPluginNotAdded(plugin);
    this.throwIfPluginNotActivated(plugin);

    this.notifyBeforePluginDeactivate(plugin);

    plugin.deactivate();

    this.notifyPluginDeactivated(plugin);
  }

  private getPluginState(plugin: AbstractPlugin): PluginState {
    this.throwIfPluginNotAdded(plugin);

    return this.pluginStates.get(plugin)!;
  }

  private installPlugin(plugin: AbstractPlugin): void {
    this.notifyBeforePluginInstall(plugin);

    this.plugins.add(plugin);
    this.pluginStates.set(plugin, initialPluginState());

    this.notifyPluginInstalled(plugin);
  }

  private uninstallPlugin(plugin: AbstractPlugin): void {
    this.notifyBeforePluginUninstall(plugin);

    this.pluginStates.delete(plugin);
    this.plugins.delete(plugin);

    this.notifyPluginUninstalled(plugin);
  }

  private throwIfPluginAdded(plugin: AbstractPlugin) {
    if (!this.isPluginAdded(plugin)) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has been added`);
    }
  }

  private throwIfPluginNotAdded(plugin: AbstractPlugin) {
    if (!this.isPluginAdded(plugin)) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has not yet added`);
    }
  }

  private throwIfPluginActivated(plugin: AbstractPlugin) {
    if (this.pluginStates.get(plugin)!.activated) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has been activated`);
    }
  }

  private throwIfPluginNotActivated(plugin: AbstractPlugin) {
    if (!this.pluginStates.get(plugin)!.activated) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has not yet activated`);
    }
  }


  private notifyBeforePluginInstall(plugin: AbstractPlugin): void {
    plugin.beforeInstall();
    this.options.beforePluginInstall?.call(null, this, plugin);
  }

  private notifyPluginInstalled(plugin: AbstractPlugin): void {
    plugin.installed();
    this.options.pluginInstalled?.call(null, this, plugin);
  }

  private notifyBeforePluginActivate(plugin: AbstractPlugin): void {
    plugin.beforeActivate();
    this.options.beforePluginActivate?.call(null, this, plugin);
  }

  private notifyPluginActivated(plugin: AbstractPlugin): void {
    plugin.activated();
    this.options.pluginActivated?.call(null, this, plugin);
  }

  private notifyBeforePluginDeactivate(plugin: AbstractPlugin): void {
    plugin.beforeDeactivate();
    this.options.beforePluginDeactivate?.call(null, this, plugin);
  }

  private notifyPluginDeactivated(plugin: AbstractPlugin): void {
    plugin.deactivated();
    this.options.pluginDeactivated?.call(null, this, plugin);
  }

  private notifyBeforePluginUninstall(plugin: AbstractPlugin): void {
    plugin.beforeUninstall();
    this.options.beforePluginUninstall?.call(null, this, plugin);
  }

  private notifyPluginUninstalled(plugin: AbstractPlugin): void {
    plugin.uninstalled();
    this.options.pluginUninstalled?.call(null, this, plugin);
  }
}

function initialPluginState(): PluginState {
  return {
    activated: false,
  };
}
