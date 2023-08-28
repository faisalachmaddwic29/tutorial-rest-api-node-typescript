import { Router } from 'express'
import { createProduct, getAllProduct, getProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getAllProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', createProduct)
