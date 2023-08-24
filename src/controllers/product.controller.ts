import { type Request, type Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'

export const createProduct = (req: Request, res: Response) => {
    const { error, value } = createProductValidation(req.body)

    if (error) {
        console.log(error)
        logger.error('Err = product - create ', error.details[0].message)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message.replace(/[^a-zA-Z0-9\s]/g, ''),
            data: {}
        })
    }
    logger.info({ data: req.body }, 'Success add new product')

    res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Success add new product',
        data: value
    })
}

export const getAllProduct = (req: Request, res: Response) => {
    logger.info('Success get product data')

    res.status(200).send({
        status: true,
        statusCode: 200,
        data: [
            {
                name: 'Sepatu Price',
                price: 9000
            }
        ]
    })
}

export const getProduct = (req: Request, res: Response) => {
    const products = [
        { name: 'Sepatu', price: 200000 },
        { name: 'Kaos', price: 100000 }
    ]

    const {
        params: { name }
    } = req

    if (name) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, array-callback-return
        const filterProduct = products.filter((product) => {
            if (product.name === name) {
                return product
            }
        })

        if (filterProduct.length === 0) {
            logger.info('Data Not Found')

            return res.status(404).send({
                status: false,
                statusCode: 404,
                data: {}
            })
        }
        logger.info('Success get product data')
        return res.status(200).send({
            status: true,
            statusCode: 200,
            data: filterProduct[0]
        })
    }

    return res.status(200).send({
        status: true,
        statusCode: 200,
        data: products
    })
}
