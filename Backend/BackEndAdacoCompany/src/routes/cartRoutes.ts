import * as express from 'express'

import { getQuantityInCartByIDController, addOneProductToCartController, getAllProductInCartController, deleteProductInCartController, addQuantityProductInCartController, minusQuantityProductInCartController, inputQuantityProductInCartController, addMoreQuantityProductInCartController} from '../controllers/cartController'

const cartRoutes = express.Router()

cartRoutes.post('/get-quantity-in-cart', getQuantityInCartByIDController)
cartRoutes.post('/add-one-product-to-cart', addOneProductToCartController)
cartRoutes.get('/get-all-product-in-cart', getAllProductInCartController)
cartRoutes.post('/delete-product-in-cart', deleteProductInCartController)
cartRoutes.post('/add-quantity-product-in-cart', addQuantityProductInCartController)
cartRoutes.post('/minus-quantity-product-in-cart', minusQuantityProductInCartController)
cartRoutes.post('/input-quantity-product-in-cart', inputQuantityProductInCartController)
cartRoutes.post('/add-more-quantity-product-in-cart', addMoreQuantityProductInCartController)

export {  cartRoutes }