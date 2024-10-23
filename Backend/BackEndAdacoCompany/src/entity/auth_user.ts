import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { cart } from './cart'

@Entity()
export class auth_user{
    @PrimaryGeneratedColumn()
    id:number 

    @Column({type:'varchar', length:128})
    password:string 

    @Column({type:'timestamp', nullable : true})
    last_login:Date 

    @Column({type: 'bool', default:false})
    is_superuser:boolean

    @Column({type:'varchar', length:150})
    username:string 

    @Column({type:'varchar', length:150})
    first_name:string 

    @Column({type:'varchar', length:150})
    last_name :string 

    @Column({type:'varchar', length: 255})
    gmail: string 

    @Column({type:'bool', default: false})
    is_staff:boolean

    @Column({type:'bool', default:false})
    is_active:boolean

    @Column({type:'timestamp', default : ()=> "CURRENT_TIMESTAMP"})
    date_joined:Date

    @Column({type:'varchar', length: 12})
    tel:string 

    @Column({type:'varchar', length: 255})
    avatar:string 

    @Column({type:'date'})
    dob:Date

    @OneToMany(() => cart, (cartIdUser) => cartIdUser.id_user)
    carts: cart[];
}