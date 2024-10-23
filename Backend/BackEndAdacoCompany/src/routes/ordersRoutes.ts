import * as express from 'express'
import { orderBuyNowController, makeOrderFromCartController, searchOrderByCodeController, getOrderHistoryController, getOrderStatusController} from '../controllers/ordersController'

const ordersRoutes = express.Router()

ordersRoutes.post('/create-order-buy-now', orderBuyNowController)
ordersRoutes.post('/make-order-from-cart', makeOrderFromCartController)
ordersRoutes.get('/search-order-by-code', searchOrderByCodeController)
ordersRoutes.get('/get-orders-history', getOrderHistoryController)
ordersRoutes.get('/get-orders-by-status', getOrderStatusController)

export { ordersRoutes }