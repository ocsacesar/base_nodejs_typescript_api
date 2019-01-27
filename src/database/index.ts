/**
 * Created by Ovídio César on 10/12/17.
 */
import { Sequelize } from 'sequelize-typescript';
import * as settings from "../setting";

const databaseInfo = settings.getDatabase();

export const sequelize = new Sequelize({
    host: databaseInfo.host,
    port: databaseInfo.port,
    dialect: databaseInfo.dialect,
    database: databaseInfo.database,
    username: databaseInfo.username,
    password: databaseInfo.password,
    modelPaths: [__dirname + '/models'],
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    }
});