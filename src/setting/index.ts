/**
 * Created by Ovídio César on 10/12/17.
 */
import * as nconf from "nconf";
import * as path from "path";

const settings = nconf.file(path.join(__dirname, './settings.json'));
let environment = 'dev';

export interface IEnvironment {
    projectName: string;
    version: string;
    database: IDatabaseSetting;
    server: IServerSettings;
}

export interface IServerSettings {
    environment: string;
    port: number;
    plugins: Array<string>;
    jwtSecret: string;
    jwtExpiration: string;
    routePrefix: string;
}

export interface IDatabaseSetting {
    database: string;
    dialect: string;
    username: string;
    password: string;
    host: string;
    force: boolean;
}

export function setEnvironment(env?: string) {
    environment = env || 'dev';
}

export function getEnvironment(): IServerSettings {
    return settings.get(environment).server.environment;
}

export function getSettings(): IEnvironment {
    return settings.get(environment);
}

export function getProjectName(): string {
    return settings.get('projectName');
}

export function getVersion(): string {
    return settings.get('version');
}

export function getDatabase(): IDatabaseSetting {
    return settings.get(environment).database;
}

export function getServerInfo(): IServerSettings {
    return settings.get(environment).server;
}
