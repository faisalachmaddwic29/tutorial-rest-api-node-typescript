import { Router } from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct
} from '../controllers/product.controller'
import { requiredAdmin } from '../middleware/auth'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getAllProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', requiredAdmin, createProduct)
ProductRouter.put('/:id', requiredAdmin, updateProduct)
ProductRouter.delete('/:id', requiredAdmin, deleteProduct)
