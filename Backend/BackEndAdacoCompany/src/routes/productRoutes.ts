import * as express from 'express'
const productRoutes = express.Router()

import { getAllProduct, getProductById, getDetailProductWithIDWithoutImage } from '../controllers/productController'

productRoutes.get('/get-product', getAllProduct)
productRoutes.get('/get-detail-product-by-id', getProductById)
productRoutes.get('/detail-product-by-id-without-image', getDetailProductWithIDWithoutImage)

export { productRoutes }