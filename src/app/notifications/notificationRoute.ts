import * as Hapi from "hapi";
import {IServerSettings} from "../../setting";
import * as NotificationValidator from "./notificationValidator";
import {NotificationController} from "./notificationController";

/**
 * Class responsible to manage security of application
 */
export class NotificationRoute {

    static init(server: Hapi.Server, settings: IServerSettings) {
        const notificationController = new NotificationController(settings);
        server.bind(notificationController);

        server.route({
            method: 'POST',
            path: '/notifications',
            config: {
                handler: notificationController.notification,
                auth: 'jwt',
                tags: ['api', 'notification'],
                description: 'Get a Notification',
                response: {
                    schema: NotificationValidator.notificationModelResponse
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Notification sent successfully'
                            },
                            '401': {
                                'description': 'Unauthorized'
                            }
                        }
                    }
                }
            }
        });
    }
}