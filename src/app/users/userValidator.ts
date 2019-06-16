/**
 * Created by Ovídio César on 23/03/18.
 */
import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
    username: Joi.string().trim().required(),
    name: Joi.string().required(),
    password: Joi.string().trim().required()
});