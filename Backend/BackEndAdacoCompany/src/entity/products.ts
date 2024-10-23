import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { product_img } from './product_img'
import { cart } from './cart'
import { product_order } from './product_order'

@Entity()
export class products{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", length:255, nullable:false})
    name:string 

    @Column({type:'text', nullable:false})
    description:string 

    @Column({type:"integer", nullable:false})
    price:number 

    @Column({type: "timestamp", nullable:false, default: () => "CURRENT_TIMESTAMP"})
    date_add:Date 

    @Column({type:"varchar", length:10, nullable:false})
    width_unit:10

    @Column({type:"varchar", length : 10, nullable:false})
    height_unit:10

    @Column({type:'varchar', length: 10, nullable:false})
    depth_unit:10

    @Column({type:'integer', nullable:false})
    width:number 

    @Column({type:'integer', nullable:false})
    height:number 

    @Column({type:'integer', nullable:false})
    depth:number 

    @Column({type:'varchar', length : 255, nullable:false})
    types:string 

    @Column({type:'varchar', length:1000, nullable:false})
    img_main:string

    @OneToMany(() => product_img, productImage => productImage.product )
    images: product_img[]

    @OneToMany(() => cart, (cartIdProduct) => cartIdProduct.id_product)
    carts: cart[]

    @OneToMany(() => product_order, (productOrderIdProduct) => productOrderIdProduct.id_product)
    productOrderIdProduct: product_order[]
}