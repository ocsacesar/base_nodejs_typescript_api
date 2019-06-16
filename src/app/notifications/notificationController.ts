/**
 * Created by Ovídio César on 23/03/18.
 */
import * as Hapi from "hapi";
import { IServerSettings } from "../../setting/index";

export class NotificationController {

    private serverSettings: IServerSettings;

    constructor(serverSettings: IServerSettings) {
        this.serverSettings = serverSettings;
    }

    public async notification(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return {
            status: true,
            message: 'Message received by server on ' + new Date()
        };
    }
}
