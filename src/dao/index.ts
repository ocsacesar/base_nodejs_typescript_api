/**
 * Created by cesar on 10/12/17.
 */
import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import * as settings from "../setting";

const databaseInfo = settings.getDatabase();

export const sequelize =  new Sequelize({
    database: databaseInfo.database,
    dialect: databaseInfo.dialect,
    username: databaseInfo.username,
    password: databaseInfo.password,
    operatorsAliases: false,
    modelPaths: [path.join(__dirname, '../models')]
});