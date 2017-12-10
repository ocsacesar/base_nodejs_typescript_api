/**
 * Created by cesar on 10/12/17.
 */
import * as nconf from "nconf";
import * as path from "path";

const configs = nconf.file(path.join(__dirname, './settings.json'));

export interface IEnvironment {
    database: IDatabaseSetting;
    server: IServerSettings;
}

export interface IServerSettings {
    port: number;
    plugins: Array<string>;
    jwtSecret: string;
    jwtExpiration: string;
    routePrefix: string;
}

export interface IDatabaseSetting {
    connectionString: string;
}

export function getEnvironment(env?: string): IEnvironment {
    return configs.get(env || 'dev');
}