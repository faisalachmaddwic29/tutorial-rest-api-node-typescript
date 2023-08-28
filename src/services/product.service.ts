import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import { type ProductType } from '../types/product.type'

export const getProductFromDB = async () => {
    return await productModel
        .find()
        .then((data) => {
            return data
        })
        .catch((err) => {
            logger.info('Cannot get data Products from DB')
            logger.error(err)
        })
}

export const addProductFromDB = async (payload: ProductType) => {
    return await productModel.create(payload)
}

export const getProductByIdFromDB = async (id: string) => {
    return await productModel.findOne({ product_id: id })
}
