import * as Joi from "joi";

export const loginUserModel = Joi.object().keys({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
});

export const responseLoginModel = Joi.object().keys({
    id: Joi.number().required(),
    username: Joi.string().allow(null).allow("").max(250).required(),
    accessToken: Joi.string().min(1).max(4096).required()
});
