import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class get_support{
    @PrimaryGeneratedColumn()
    id: number 

    @Column({type:'varchar', length: 255})
    full_name: string 

    @Column({type:'varchar', length: 255})
    gmail: string 

    @Column({type:'varchar', length : 25})
    tel: string 

    @Column({type:'text'})
    context : string 

    @Column({type:'timestamp', default : ()=>"CURRENT_TIMESTAMP"})
    date_create : Date

    @Column({type:'varchar', length: 25})
    response :string 

    @Column({type:'timestamp', precision: 6, nullable : true})
    date_response : Date
}