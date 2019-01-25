/**
 * Created by Ovídio César on 23/03/18.
 */
import * as Hapi from "hapi";
import Routes from "./routes";
import {IDatabaseSetting, IServerSettings} from "../../setting/index";
import {Sequelize} from "sequelize";

export function init(server: Hapi.Server, settings: IServerSettings, database: Sequelize) {
    Routes(server, settings, database);
}
