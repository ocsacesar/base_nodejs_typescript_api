import * as Hapi from "hapi";
import {IServerSettings} from "../../setting";
import {AuthController} from "./authController";
import * as authValidator from "./authValidator";

/**
 * Class responsible to manage security of application
 */
export class AuthRoute {

    static init(server: Hapi.Server, settings: IServerSettings) {

        const authController = new AuthController(settings);
        server.bind(authController);

        server.route({
            method: 'POST',
            path: '/login',
            config: {
                handler: authController.login,
                auth: false,
                tags: ['api', 'login'],
                description: 'User login.',
                validate: {
                    payload: authValidator.loginUserModel
                },
                response: {
                    schema: authValidator.responseLoginModel
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'User logged in.'
                            },
                            '400': {
                                'description': 'Bad Request'
                            },
                            '401': {
                                'description': 'Invalid username or password'
                            }
                        }
                    }
                }
            }
        });

    }
}