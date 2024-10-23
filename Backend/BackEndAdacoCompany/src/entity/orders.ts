import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { division } from './division'
import { auth_user } from './auth_user'
import { buyer } from './buyer'
import { product_order } from './product_order'

@Entity()
export class orders{
    @PrimaryGeneratedColumn()
    id:number 

    // Because gen_random_uuid function is option so you need to make sure install in postgresql
    /* 
    To install gen_random_uuid function. Run sql query :
    create extension if not exists "pgcrypto"
    */
    @Column({type:'uuid', default: () => 'gen_random_uuid()'})
    code:string

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date_create:Date 

    @Column({type:'timestamp', nullable : true})
    departure_time:Date 

    @Column({type: 'timestamp', nullable : true})
    estimate_time_arrive: Date 

    @Column({type:'timestamp', nullable : true})
    real_time_arrive: Date 

    @Column({type:'integer'})
    total_cost: number 

    @Column({type:'integer'})
    shipping_fee:number 

    @Column({type : 'integer'})
    total_price_product:number 

    @Column({type:'text'})
    note: string 

    @ManyToOne(()=>division, (divisions) => divisions.ordersIdDivision)
    @JoinColumn({name : 'id_division'})
    id_division: division

    @ManyToOne(() => buyer)
    @JoinColumn({name : 'id_buyer'})
    id_buyer: buyer

    @ManyToOne(()=>auth_user)
    @JoinColumn({name : 'id_user'})
    id_user: auth_user

    @Column({type:'varchar', length: 255})
    status:string

    @OneToMany(() => product_order, (productOrderIdOrder) => productOrderIdOrder.id_order)
    productOrderIdOrder: product_order[]
}