import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm'
import { orders } from './orders'
import { products } from './products'

@Entity()
export class product_order{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> orders, (order) => order.productOrderIdOrder)
    @JoinColumn({name : 'id_order'})
    id_order: orders 

    @ManyToOne(()=> products, (product) => product.productOrderIdProduct)
    @JoinColumn({name : 'id_product'})
    id_product: products

    @Column({type:'integer'})
    quantity : number
}