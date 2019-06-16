/**
 * Created by Ovídio César on 22/03/18.
 */
import * as Hapi from "hapi";
import * as HapiAuthJwt from "hapi-auth-jwt2";
import * as settings from "../../setting";
import {User} from "../../database/models/User";

export class Security {

    async register(server: Hapi.Server) {

        const validate = async function (decoded, request) {

            const user = await User.find({
                where: {
                    id: decoded.data.id,
                    username: decoded.data.username
                }
            });

            return { isValid: user != null};

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
