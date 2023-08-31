import Joi from 'joi'
import { type UserType } from '../types/user.type'

export const createUserValidation = (payload: UserType) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        name: Joi.string().required().min(3),
        email: Joi.string().required(),
        password: Joi.string().required().min(5),
        role: Joi.string()
    })

    return schema.validate(payload, { abortEarly: false })
}

export const createSessionValidation = (payload: UserType) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(5)
    })

    return schema.validate(payload, { abortEarly: false })
}

export const refreshSessionValidation = (payload: UserType) => {
    const schema = Joi.object({
        refresh_token: Joi.string().required()
    })

    return schema.validate(payload, { abortEarly: false })
}
