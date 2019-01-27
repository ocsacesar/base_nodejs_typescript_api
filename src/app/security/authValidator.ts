import * as Joi from "joi";

export const loginUserModel = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});

export const responseLoginModel = Joi.object().keys({
    name: Joi.string().allow(null).allow("").max(250).required(),
    token: Joi.string().min(1).max(4096).required()
});

export const jwtValidator = Joi.object({'authorization': Joi.string().required()}).unknown();