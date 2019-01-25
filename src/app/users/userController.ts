/**
 * Created by Ovídio César on 23/03/18.
 */
import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabaseSetting, IServerSettings } from "../../setting/index";
import { Sequelize } from "sequelize";

export class UserController {

    private configs: IServerSettings;
    private database: Sequelize;

    constructor(configs: IServerSettings, database: Sequelize) {
        this.configs = configs;
        this.database = database;
    }

    // private generateToken(user: IUser) {
    //     const jwtSecret = this.configs.jwtSecret;
    //     const jwtExpiration = this.configs.jwtExpiration;
    //
    //     return Jwt.sign({ id: user._id }, jwtSecret, { expiresIn: jwtExpiration });
    // }


    // public async loginUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    //     const email = request.payload.email;
    //     const password = request.payload.password;
    //
    //     let user: IUser = await this.database.userModel.findOne({ email: email });
    //
    //     if (!user) {
    //         return reply(Boom.unauthorized("User does not exists."));
    //     }
    //
    //     if (!user.validatePassword(password)) {
    //         return reply(Boom.unauthorized("Password is invalid."));
    //     }
    //
    //     reply({
    //         token: this.generateToken(user)
    //     });
    // }

    // public async createUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    //     try {
    //         let user: any = await this.database.userModel.create(request.payload);
    //         return reply({ token: this.generateToken(user)}).code(201);
    //     } catch (error) {
    //         return reply(Boom.badImplementation(error));
    //     }
    // }

    // public async updateUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    //     const id = request.auth.credentials.id;
    //
    //     try {
    //         let  user: IUser = await this.database.userModel.findByIdAndUpdate(id, { $set: request.payload }, { new: true });
    //         return reply(user);
    //     } catch (error) {
    //         return reply(Boom.badImplementation(error));
    //     }
    // }

    // public async deleteUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    //     const id = request.auth.credentials.id;
    //     let user: IUser = await this.database.userModel.findByIdAndRemove(id);
    //
    //     return reply(user);
    // }

    public async infoUser(request: Hapi.Request) {
        const id = request.auth.credentials.id;
        let user = await this.database.models.User.findById(id);

        return user;
    }
}
