/**
 * Created by cesar on 07/12/17.
 */
import * as Hapi from "hapi";
import * as config from "./setting";

export class Server {

    constructor() {
        console.log('Starting Application...');
        this.init();
    }

    init() {
        // Create a server with a host and port
        const server = Hapi.server({
            host: 'localhost',
            port: config.getEnvironment().server.port
        });

        try {
            server.start();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }

        console.log('Server running at:', server.info.uri);
    }

}

