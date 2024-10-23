import "reflect-metadata"
import { DataSource } from "typeorm"

// Import entities
import { products } from './entity/products'
import { auth_user } from './entity/auth_user'
import { get_support } from './entity/get_support'
import { product_img } from './entity/product_img'
import { division } from './entity/division'
import { cart } from './entity/cart'
import { buyer } from './entity/buyer'
import { orders } from './entity/orders'
import { product_order } from './entity/product_order'

// Import migration
import { AddConstraintToCart1716795752470 } from './migration/1716795752470-AddConstraintToCart'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456#A",
    database: "AdacoCompanyORM",
    synchronize: true,
    logging: false,
    entities: [products, auth_user, get_support, product_img, division, cart, buyer, orders, product_order],
    migrations: [
        AddConstraintToCart1716795752470
    ],
    subscribers: [],
})
