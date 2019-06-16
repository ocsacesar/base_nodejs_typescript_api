/**
 * Created by Ovídio César on 23/03/18.
 */
import * as Hapi from "hapi";
import * as Boom from "boom";
import { IServerSettings } from "../../setting/index";
import {User} from "../../database/models/User";
import {AuthController} from "../security/authController";

export class UserController {

    private serverSettings: IServerSettings;
    private authController: AuthController;

    constructor(serverSettings: IServerSettings) {
        this.serverSettings = serverSettings;
        this.authController = new AuthController(serverSettings);
    }

    public async createUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            let user: any = await User.create(request.payload);

            return reply.response({
                id: user.id,
                username: user.username,
                name: user.name,
                accessToken: await this.authController.generateToken(user)
            }).code(201);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }
}
