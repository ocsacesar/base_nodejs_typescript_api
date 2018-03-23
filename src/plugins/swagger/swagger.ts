/**
 * Created by cesar on 22/03/18.
 */
import * as Hapi from "hapi";
import * as Inert from "inert";
import * as Vision from "vision";
import * as HapiSwagger from "hapi-swagger";

export class Swagger {

    constructor() {}

    async register(server: Hapi.Server) {

        const swaggerOptions = {
            info: {
                title: 'Test API Documentation',
                version: '1.0.0'
            },
            swaggerUI: true,
            documentationPage: true,
            documentationPath: '/docs'
        };

        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]);
    }
}