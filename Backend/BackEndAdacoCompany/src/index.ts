import { AppDataSource } from './data-source'
import * as express from 'express'
import { Express, Request, Response } from 'express'
import 'reflect-metadata'
import * as path from 'path'
import * as cors from 'cors'

const app:Express = express()
app.use(express.json())
const port:number = 3000
const api_route = express.Router()

// Import different routes
import { productRoutes } from './routes/productRoutes'
import { userRoutes } from './routes/userRoutes'
import { contactRoutes } from './routes/contactRoutes'
import { divisionRoutes } from './routes/divisionRoutes'
import { cartRoutes } from './routes/cartRoutes'
import { ordersRoutes } from './routes/ordersRoutes'


// Test route, delete when project finish
// TODO
app.get('/', (req:Request, res : Response) => {
    res.send('Hello world 3')
})

api_route.use('/product', productRoutes)
api_route.use('/user', userRoutes)
api_route.use('/contact', contactRoutes)
api_route.use('/division', divisionRoutes)
api_route.use('/cart', cartRoutes)
api_route.use('/order', ordersRoutes)

app.use('/media', express.static(path.join(__dirname, 'media/')))
app.use(express.json())
app.use(cors())
app.use('/api/v1', api_route)

AppDataSource.initialize().then(async () =>{
    app.listen(port, ()=>{
        console.log('Server is running on port : ' + port)
    });
    console.log('Data Source has been initialized')
}).catch((error)=>console.log(error))