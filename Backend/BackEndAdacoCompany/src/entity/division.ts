import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { orders } from './orders'

@Entity()
export class division{
    @PrimaryGeneratedColumn()
    id:number 

    @Column({type:'varchar', length:255})
    province : string 

    @Column({type:'varchar', length: 255})
    district:string 

    @Column({type:'varchar', length: 255})
    ward:string

    @Column({type:'varchar', length: 255})
    latitude:string

    @Column({type:'varchar', length: 255})
    longitude:string

    @OneToMany(() => orders, (ordersIdDivision) => ordersIdDivision.id_division)
    ordersIdDivision: orders[]
}