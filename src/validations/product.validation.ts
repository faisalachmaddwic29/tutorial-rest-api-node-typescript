import Joi from 'joi'

interface ProductInterface {
    name: string
    price?: number
}

export const createProductValidation = (payload: ProductInterface) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        price: Joi.number().allow('', null)
    })

    return schema.validate(payload)
}
