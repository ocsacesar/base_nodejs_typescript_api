import * as Joi from "joi";

export const notificationModelResponse = Joi.object().keys({
    status: Joi.boolean().required(),
    message: Joi.string().required()
});