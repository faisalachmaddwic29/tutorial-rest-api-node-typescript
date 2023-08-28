import { type Request, type Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { getProductFromDB, addProductFromDB, getProductByIdFromDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
    req.body.product_id = uuidv4()
    const { error, value } = createProductValidation(req.body)

    if (error) {
        logger.error('Err = product - create ', error.details[0].message)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message.replace(/[^a-zA-Z0-9\s]/g, ''),
            data: {}
        })
    }
    try {
        await addProductFromDB(value)
        logger.info({ data: req.body }, 'Success add new product')

        res.status(200).send({
            status: true,
            statusCode: 200,
            message: 'Success add new product',
            data: value
        })
    } catch (err) {
        logger.error('Err = product - create ', err)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
            data: {}
        })
    }
}

export const getAllProduct = async (req: Request, res: Response) => {
    const products: any = await getProductFromDB()

    logger.info('Success get data Product')

    return res.status(200).send({
        status: true,
        statusCode: 200,
        data: products
    })
}

export const getProduct = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    if (id) {
        const product = await getProductByIdFromDB(id)

        if (product) {
            logger.info('Success get product data')
            return res.status(200).send({
                status: true,
                statusCode: 200,
                data: product
            })
        } else {
            logger.error('Product tidak di temukan dengan id : ' + id)
            return res.status(404).send({
                status: false,
                statusCode: 422,
                message: 'Produk tidak ditemukan',
                data: {}
            })
        }
    } else {
        const products: any = await getProductFromDB()

        logger.info('Success get product data')
        return res.status(200).send({
            status: true,
            statusCode: 200,
            data: products
        })
    }
}

// export const getProduct = async (req: Request, res: Response) => {
//     const products: any = await getProductFromDB()

//     const {
//         params: { name }
//     } = req

//     if (name) {
//         // eslint-disable-next-line array-callback-return
//         const filterProduct = products.filter((product: ProductType) => {
//             return product.name.toLowerCase().includes(name.toLowerCase())
//             // console.log(product.name.indexOf(name) > -1)
//             // console.log(name === product.name)
//             // if (product.name === name) {
//             //     return product
//             // }
//             // if (product.name.indexOf(name) > -1) {
//             //     return product
//             // }
//         })

//         console.log('ini jalan : ' + filterProduct)

//         if (filterProduct.length === 0) {
//             logger.info('Data Not Found')

//             return res.status(404).send({
//                 status: false,
//                 statusCode: 404,
//                 data: {}
//             })
//         }
//         logger.info('Success get product data')
//         return res.status(200).send({
//             status: true,
//             statusCode: 200,
//             data: filterProduct
//         })
//     }

//     return res.status(200).send({
//         status: true,
//         statusCode: 200,
//         data: products
//     })
// }
