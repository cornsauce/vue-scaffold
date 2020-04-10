interface Lifecycle<ModuleType extends Plugin> {
  beforeInstall: (this: ModuleType) => void;
  installed: (this: ModuleType) => void;
  beforeActivate: (this: ModuleType) => void;
  activate: (this: ModuleType) => void;
  activated: (this: ModuleType) => void;
  beforeDeactivate: (this: ModuleType) => void;
  deactivate: (this: ModuleType) => void;
  deactivated: (this: ModuleType) => void;
  beforeUninstall: (this: ModuleType) => void;
  uninstalled: (this: ModuleType) => void;
}

export abstract class Plugin implements Lifecycle<Plugin> {
  public abstract getName(): string;

  //
  // TODO: use [Version] class instead of version string
  public abstract getVersion(): string;

  public beforeInstall(): void {
  }

  public installed(): void {
  }

  public beforeActivate(): void {
  }

  public abstract activate(): void;

  public activated(): void {
  }

  public beforeDeactivate(): void {
  }

  public abstract deactivate(): void;

  public deactivated(): void {
  }

  public beforeUninstall(): void {
  }

  public uninstalled(): void {
  }
}

export interface InstantModuleOptions {
  name: string;
  version: string;
  beforeInstall?: () => void;
  installed?: () => void;
  beforeActivate?: () => void;
  activate: () => void;
  activated?: () => void;
  beforeDeactivate?: () => void;
  deactivate: () => void;
  deactivated?: () => void;
  beforeUninstall?: () => void;
  uninstalled?: () => void;
}

class InstantPlugin extends Plugin implements Lifecycle<InstantPlugin> {
  private readonly options: InstantModuleOptions;

  constructor(options: InstantModuleOptions) {
    super();

    this.options = options;
  }

  public getName(): string {
    return this.options.name;
  }

  public getVersion(): string {
    return this.options.version;
  }

  public beforeInstall(): void {
    this.options.beforeInstall?.call(null);
  }

  public installed(): void {
    this.options.installed?.call(null);
  }

  public beforeActivate(): void {
    this.options.beforeActivate?.call(null);
  }

  public activate(): void {
    this.options.activate.call(null);
  }

  public activated(): void {
    this.options.activated?.call(null);
  }

  public beforeDeactivate(): void {
    this.options.beforeDeactivate?.call(null);
  }

  public deactivate(): void {
    this.options.deactivate.call(null);
  }

  public deactivated(): void {
    this.options.deactivated?.call(null);
  }

  public beforeUninstall(): void {
    this.options.beforeUninstall?.call(null);
  }

  public uninstalled(): void {
    this.options.uninstalled?.call(null);
  }
}
