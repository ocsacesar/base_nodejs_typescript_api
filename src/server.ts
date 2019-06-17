/**
 * Created by Ovídio César on 07/12/17.
 */
import * as Hapi from "hapi";
import * as settings from "./setting";
import { sequelize } from './database';
import { Swagger } from "./plugins/swagger/swagger";
import { Security } from "./plugins/jwt-auth/security";
import * as Colors from "Colors";

import {AuthRoute} from "./app/security/authRoute";
import {User} from "./database/models/User";
import {UserRoute} from "./app/users/userRoute";
import {NotificationRoute} from "./app/notifications/notificationRoute";
import * as Path from "path";

/**
 * Class responsible to configure and start the server.
 */
export class Server {
    /**
     * Constructor
     * @param {string} env
     */
    constructor(env = 'env') {
        // Setting environment
        settings.setEnvironment(env);

        console.log(Colors.green(`Starting ${settings.getProjectName()} application on ${settings.getEnvironment()} environment ...`));

        this.init()
            .then(server => console.log(Colors.green(`Server running at: ${server.info.uri}`)))
            .catch(err => console.log(Colors.red(err)));
    }

    /**
     * Set up the server, register plugins, routes and start it.
     * @returns {Promise<any>}
     */
    async init() {

        /**
         * Instantiate a server with a host and port
         */
        const server = Hapi.server({
            host: 'localhost',
            port: settings.getServerSettings().server.port,
            routes: {
                cors: true,
                files: {
                    relativeTo: Path.join(__dirname, 'public/')
                }
            }
        });

        /**
         * Register plugins
         */
        await sequelize.sync({force: settings.getDatabase().force}).then(() => {
            User.create({name: 'Usuário 1', username: 'user1', password: '111111'});
        });

        const swagger = new Swagger();
        await swagger.register(server);

        const security = new Security();
        await security.register(server);

        // Server the index.html
        server.route({
            method: 'GET',
            path: '/',
            config: {
                auth: false,
                handler: function (request, h) {
                    return h.file('index.html');
                }
            }
        });

        // Server all files required by index.html
        server.route({
            method: 'GET',
            path: '/{filename}',
            config: {
                auth: false,
                handler: {
                    file: function (request) {
                        const filename = request.params.filename;

                        if (filename.indexOf('.') >= 0) {
                            return request.params.filename;
                        } else {
                            return 'index.html';
                        }
                    }
                }
            }
        });

        /**
         * Configure Routes
         */
        AuthRoute.init(server, settings.getServerInfo());
        UserRoute.init(server, settings.getServerInfo());
        NotificationRoute.init(server, settings.getServerInfo());

        /**
         * Start the server
         */
        try {
            await server.start();
        } catch (err) {
            console.log(Colors.red(err));
            process.exit(1);
        }

        return server;
    }

}
