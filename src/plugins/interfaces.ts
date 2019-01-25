/**
 * Created by Ovídio César on 22/03/18.
 */
import * as Hapi from "hapi";
import * as settings from "../setting";

export interface IPluginOptions {
    database: settings.IDatabaseSetting;
    serverConfigs: settings.IServerSettings;
}

export interface IPlugin {
    register(server: Hapi.Server, options?: IPluginOptions): Promise<void>;
    info(): IPluginInfo;
}

export interface IPluginInfo {
    name: string;
    version: string;
}
