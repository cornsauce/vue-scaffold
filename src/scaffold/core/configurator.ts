import {Application, ApplicationOptions} from '@/scaffold/core/application';

export type BuildPhaseConfigurator = () => void;
export type AssemblePhaseConfigurator = (state: any) => BuildPhaseConfigurator;
export type ConfigurePhaseConfigurator = (app: Application) => AssemblePhaseConfigurator;

export type Configurator = ConfigurePhaseConfigurator;
export type StaticConfigurator = (options: ApplicationOptions) => Configurator;
