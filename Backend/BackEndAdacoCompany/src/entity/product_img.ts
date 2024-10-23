import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { products } from './products'

@Entity()
export class product_img{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar', length: 1000})
    image: string

    @ManyToOne(()=> products, product => product.images)
    @JoinColumn({name :"product_id"})
    product: products

}