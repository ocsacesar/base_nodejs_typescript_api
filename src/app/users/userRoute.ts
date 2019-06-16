import * as Hapi from "hapi";
import {IServerSettings} from "../../setting";
import {UserController} from "./userController";
import * as UserValidator from "./userValidator";

/**
 * Class responsible to manage security of application
 */
export class UserRoute {

    static init(server: Hapi.Server, settings: IServerSettings) {
        const userController = new UserController(settings);
        server.bind(userController);

        server.route({
            method: 'POST',
            path: '/user',
            config: {
                handler: userController.createUser,
                auth: false,
                tags: ['api', 'user'],
                description: 'Create a user.',
                validate: {
                    payload: UserValidator.createUserModel
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '201': {
                                'description': 'User created successfully'
                            },
                            '400': {
                                'description': 'Bad Request'
                            }
                        }
                    }
                }
            }
        });
    }
}