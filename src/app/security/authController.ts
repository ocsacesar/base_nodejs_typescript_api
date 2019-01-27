import * as Hapi from "hapi";
import * as Boom from "Boom";
import * as JWT from "jsonwebtoken";
import * as Bcrypt from "bcryptjs";
import {Sequelize} from "sequelize";
import {IServerSettings} from "../../setting";
import {User} from "../../database/models/User";

export class AuthController {

    private serverSettings: IServerSettings;

    constructor(serverSettings: IServerSettings) {
        this.serverSettings = serverSettings;
    }

    public async login(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const email = request.payload.email;
        const password = request.payload.password;

        let user = await User.scope('login').findOne({where: {email: email}});

        if (user != null) {
            let passwordValid = await Bcrypt.compareSync(password, user.password);
            if (passwordValid) {
                let responseValue = {
                    'name': user.name,
                    'token': this.generateToken(user)
                };
                return responseValue;
            }
        }

        return Boom.unauthorized('Invalid username or password');
    }

    private generateToken(user) {
        const jwtSecret = this.serverSettings.jwtSecret;
        const jwtExpiration = this.serverSettings.jwtExpiration;

        return JWT.sign({data: user}, jwtSecret, {expiresIn: jwtExpiration});
    }

}