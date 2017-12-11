/**
 * Created by cesar on 07/12/17.
 */
import * as Hapi from "hapi";
import * as settings from "./setting";
import { sequelize } from './dao/index';

export class Server {

    constructor() {
        console.log('Starting ' + settings.getProjectName() + ' Application...');
        this.init();
    }

    init() {
        // Create a server with a host and port
        const server = Hapi.server({
            host: 'localhost',
            port: settings.getSettings().server.port
        });

        try {
            server.start();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }

        // Initializing DataBase
        (async () => {
            await sequelize.sync({force: true});
        })();

        console.log('Server running at:', server.info.uri);
    }

}

