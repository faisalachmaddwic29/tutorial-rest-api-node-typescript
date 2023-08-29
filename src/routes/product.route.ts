import { Router } from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct
} from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getAllProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', createProduct)
ProductRouter.put('/:id', updateProduct)
ProductRouter.delete('/:id', deleteProduct)
