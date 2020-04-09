import {Plugin} from './plugin';

export interface PluginManagerOptions {
  beforePluginInstall?: (manager: PluginManager, plugin: Plugin) => void;
  pluginInstalled?: (manager: PluginManager, plugin: Plugin) => void;
  beforePluginActivate?: (manager: PluginManager, plugin: Plugin) => void;
  pluginActivated?: (manager: PluginManager, plugin: Plugin) => void;
  beforePluginDeactivate?: (manager: PluginManager, plugin: Plugin) => void;
  pluginDeactivated?: (manager: PluginManager, plugin: Plugin) => void;
  beforePluginUninstall?: (manager: PluginManager, plugin: Plugin) => void;
  pluginUninstalled?: (manager: PluginManager, plugin: Plugin) => void;
}

export interface PluginState {
  activated: boolean;
}

export class PluginManager {
  private readonly options: PluginManagerOptions;
  private readonly plugins: Set<Plugin>;
  private readonly pluginStates: Map<Plugin, PluginState>;

  constructor(options: PluginManagerOptions) {
    this.options = options;
    this.plugins = new Set();
    this.pluginStates = new Map();
  }

  public isPluginAdded(plugin: Plugin): boolean {
    return this.plugins.has(plugin);
  }

  public addPlugin(plugin: Plugin, activate?: boolean): () => void {
    this.throwIfPluginAdded(plugin);

    this.installPlugin(plugin);
    if (activate) {
      this.activatePlugin(plugin);
    }

    return () => {
      this.removePlugin(plugin);
    };
  }

  public removePlugin(plugin: Plugin): void {
    this.throwIfPluginNotAdded(plugin);

    this.deactivatePlugin(plugin);
    this.uninstallPlugin(plugin);
  }

  public activatePlugin(plugin: Plugin): void {
    this.throwIfPluginNotAdded(plugin);
    this.throwIfPluginActivated(plugin);

    this.notifyBeforePluginActivate(plugin);

    plugin.activate();

    this.notifyPluginActivated(plugin);
  }

  public deactivatePlugin(plugin: Plugin): void {
    this.throwIfPluginNotAdded(plugin);
    this.throwIfPluginNotActivated(plugin);

    this.notifyBeforePluginDeactivate(plugin);

    plugin.deactivate();

    this.notifyPluginDeactivated(plugin);
  }

  private getPluginState(plugin: Plugin): PluginState {
    this.throwIfPluginNotAdded(plugin);

    return this.pluginStates.get(plugin)!;
  }

  private installPlugin(plugin: Plugin): void {
    this.notifyBeforePluginInstall(plugin);

    this.plugins.add(plugin);
    this.pluginStates.set(plugin, initialPluginState());

    this.notifyPluginInstalled(plugin);
  }

  private uninstallPlugin(plugin: Plugin): void {
    this.notifyBeforePluginUninstall(plugin);

    this.pluginStates.delete(plugin);
    this.plugins.delete(plugin);

    this.notifyPluginUninstalled(plugin);
  }

  private throwIfPluginAdded(plugin: Plugin) {
    if (!this.isPluginAdded(plugin)) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has been added`);
    }
  }

  private throwIfPluginNotAdded(plugin: Plugin) {
    if (!this.isPluginAdded(plugin)) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has not yet added`);
    }
  }

  private throwIfPluginActivated(plugin: Plugin) {
    if (this.pluginStates.get(plugin)!.activated) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has been activated`);
    }
  }

  private throwIfPluginNotActivated(plugin: Plugin) {
    if (!this.pluginStates.get(plugin)!.activated) {
      throw new Error(`the plugin '${plugin.getName()}@${plugin.getVersion()}' has not yet activated`);
    }
  }


  private notifyBeforePluginInstall(plugin: Plugin): void {
    plugin.beforeInstall();
    this.options.beforePluginInstall?.call(null, this, plugin);
  }

  private notifyPluginInstalled(plugin: Plugin): void {
    plugin.installed();
    this.options.pluginInstalled?.call(null, this, plugin);
  }

  private notifyBeforePluginActivate(plugin: Plugin): void {
    plugin.beforeActivate();
    this.options.beforePluginActivate?.call(null, this, plugin);
  }

  private notifyPluginActivated(plugin: Plugin): void {
    plugin.activated();
    this.options.pluginActivated?.call(null, this, plugin);
  }

  private notifyBeforePluginDeactivate(plugin: Plugin): void {
    plugin.beforeDeactivate();
    this.options.beforePluginDeactivate?.call(null, this, plugin);
  }

  private notifyPluginDeactivated(plugin: Plugin): void {
    plugin.deactivated();
    this.options.pluginDeactivated?.call(null, this, plugin);
  }

  private notifyBeforePluginUninstall(plugin: Plugin): void {
    plugin.beforeUninstall();
    this.options.beforePluginUninstall?.call(null, this, plugin);
  }

  private notifyPluginUninstalled(plugin: Plugin): void {
    plugin.uninstalled();
    this.options.pluginUninstalled?.call(null, this, plugin);
  }
}

function initialPluginState(): PluginState {
  return {
    activated: false,
  };
}
