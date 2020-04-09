import {App, AppOptions} from '@/core/app';

export type BuildPhaseConfigurator = () => void;
export type AssemblePhaseConfigurator = (state: any) => BuildPhaseConfigurator;
export type ConfigurePhaseConfigurator = (app: App) => AssemblePhaseConfigurator;

export type Configurator = ConfigurePhaseConfigurator;
export type StaticConfigurator = (options: AppOptions) => Configurator;
