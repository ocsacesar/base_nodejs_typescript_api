/**
 * Created by Ovídio César on 22/03/18.
 */
import * as Hapi from "hapi";
import * as HapiAuthJwt from "hapi-auth-jwt2";
import * as settings from "../../setting";

export class Security {

    async register(server: Hapi.Server) {

        const people = { // our "users database"
            1: {
                id: 1,
                name: 'Jen Jones'
            }
        };

        const validate = async function (decoded, request) {

            console.log(decoded);

            // do your checks to see if the person is valid
            if (!people[decoded.id]) {
                console.log('isValid');
                return { isValid: false };
            } else {
                console.log('isValid');
                return { isValid: true };
            }


        };

        await server.register(HapiAuthJwt);

        server.auth.strategy('jwt', 'jwt',
            {
                key: settings.getJwtSecret(),               // Never Share your secret key
                validate: validate,                         // validate function defined above
                verifyOptions: {algorithms: ['HS256']}      // pick a strong algorithm
            });

        server.auth.default('jwt');
    }
}
