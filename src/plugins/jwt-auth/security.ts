/**
 * Created by cesar on 22/03/18.
 */
import * as Hapi from "hapi";
import { IDatabaseSetting } from "../../setting/index";

export class Security {

    constructor() {}

    async register(server: Hapi.Server, database: IDatabaseSetting) {

        const people = { // our "users database"
            1: {
                id: 1,
                name: 'Jen Jones'
            }
        };

        const validate = async function (decoded, request) {

            // do your checks to see if the person is valid
            if (!people[decoded.id]) {
                return { isValid: false };
            } else {
                return { isValid: true };
            }
        };

        await server.register(require('hapi-auth-jwt2'));

        server.auth.strategy('jwt', 'jwt',
            {
                key: 'NeverShareYourSecret',          // Never Share your secret key
                validate: validate,            // validate function defined above
                verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
            });

        server.auth.default('jwt');
    }
}