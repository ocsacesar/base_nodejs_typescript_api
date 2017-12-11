/**
 * Created by cesar on 10/12/17.
 */
import * as nconf from "nconf";
import * as path from "path";

const settings = nconf.file(path.join(__dirname, './settings.json'));

export interface IEnvironment {
    projectName: string;
    version: string;
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
    database: string;
    dialect: string;
    username: string;
    password: string;
    host: string;
}

export function getSettings(env?: string): IEnvironment {
    return settings.get(env || 'dev');
}

export function getProjectName(): string {
    return settings.get('projectName');
}

export function getVersion(): string {
    return settings.get('version');
}

export function getDatabase(env?: string): IDatabaseSetting {
    return settings.get(env || 'dev').database;
}

export function getServerInfo(env?: string): IServerSettings {
    return settings.get(env || 'dev').server;
}