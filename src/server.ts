/**
 * Created by Ovídio César on 07/12/17.
 */
import * as Hapi from "hapi";
import * as settings from "./setting";
import { sequelize } from './dao/index';
import { Swagger } from "./plugins/swagger/swagger";
import { Security } from "./plugins/jwt-auth/security";
import * as Colors from "Colors";

import * as User from "./app/users";

export class Server {

    constructor(env = 'env') {
        // Setting environment
        settings.setEnvironment(env);

        console.log(Colors.green(`Starting ${settings.getProjectName()} application on ${settings.getEnvironment()} environment ...`));

        this.init()
            .then(server => console.log(Colors.green(`Server running at: ${server.info.uri}`)))
            .catch(err => console.log(Colors.red(err)));
    }

    async init() {

        /**
         * Create a server with a host and port
         */
        const server = Hapi.server({
            host: 'localhost',
            port: settings.getSettings().server.port
        });

        /**
         * Registering plugins
         */
        await sequelize.sync({force: settings.getDatabase().force});

        const swagger = new Swagger();
        await swagger.register(server);

        const security = new Security();
        await security.register(server, null);

        /**
         * Routes
         */
        User.init(server, settings.getServerInfo(), sequelize);

        server.route([
            {
                method: "GET", path: "/", config: { auth: false },
                handler: (request, reply) => {
                    return 'Token not required';
                }
            },
            {
                method: 'GET', path: '/restricted', config: { auth: 'jwt' },
                handler: (request, reply) => {
                    return 'You used a Token!';
                    // reply({text: 'You used a Token!'})
                    //     .header("Authorization", request.headers.authorization);
                }
            }
        ]);

        try {
            await server.start();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }

        return server;
    }

}
