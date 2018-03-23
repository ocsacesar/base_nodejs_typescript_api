/**
 * Created by cesar on 23/03/18.
 */
import * as Hapi from "hapi";
import * as UserValidator from "./userValidator";
import { IServerSettings } from "../../setting/index";
import { UserController } from "./userController";
import { Sequelize } from "sequelize";

export default function (server: Hapi.server, settings: IServerSettings, sequelize: Sequelize) {

    const userController = new UserController(settings, sequelize);
    server.bind(userController);

    server.route({
        method: 'GET',
        path: '/user/info',
        config: {
            handler: userController.infoUser,
            auth: "jwt",
            tags: ['api', 'users'],
            description: 'Get user info.',
            validate: {
                headers: UserValidator.jwtValidator,
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'User founded.'
                        },
                        '401': {
                            'description': 'Please login.'
                        }
                    }
                }
            }
        }
    });

    // server.route({
    //     method: 'DELETE',
    //     path: '/user',
    //     config: {
    //         handler: userController.deleteUser,
    //         auth: "jwt",
    //         tags: ['api', 'users'],
    //         description: 'Delete current user.',
    //         validate: {
    //             headers: UserValidator.jwtValidator
    //         },
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: {
    //                     '200': {
    //                         'description': 'User deleted.',
    //                     },
    //                     '401': {
    //                         'description': 'User does not have authorization.'
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });
    //
    // server.route({
    //     method: 'PUT',
    //     path: '/user',
    //     config: {
    //         handler: userController.updateUser,
    //         auth: "jwt",
    //         tags: ['api', 'users'],
    //         description: 'Update current user info.',
    //         validate: {
    //             payload: UserValidator.updateUserModel,
    //             headers: UserValidator.jwtValidator
    //         },
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: {
    //                     '200': {
    //                         'description': 'Updated info.',
    //                     },
    //                     '401': {
    //                         'description': 'User does not have authorization.'
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });
    //
    // server.route({
    //     method: 'POST',
    //     path: '/user',
    //     config: {
    //         handler: userController.createUser,
    //         tags: ['api', 'users'],
    //         description: 'Create a user.',
    //         validate: {
    //             payload: UserValidator.createUserModel
    //         },
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: {
    //                     '201': {
    //                         'description': 'User created.'
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });
    //
    // server.route({
    //     method: 'POST',
    //     path: '/user/login',
    //     config: {
    //         handler: userController.loginUser,
    //         tags: ['api', 'users'],
    //         description: 'Login a user.',
    //         validate: {
    //             payload: UserValidator.loginUserModel
    //         },
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: {
    //                     '200': {
    //                         'description': 'User logged in.'
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });
}