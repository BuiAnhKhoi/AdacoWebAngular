import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm'
import { products } from './products'
import { auth_user } from './auth_user'

@Entity()
@Unique(['id_user', 'id_product'])
export class cart{
    @PrimaryGeneratedColumn()
    id:number 

    @ManyToOne(() => products, (product) => product.carts)
    @JoinColumn({name :"id_product"})
    id_product:products 

    @ManyToOne(()=> auth_user, (user)=> user.carts) 
    @JoinColumn({name :"id_user"})
    id_user:auth_user

    @Column({type: 'integer'})
    quantity:number 

    @Column({type:'varchar', length: 255})
    price:string
}