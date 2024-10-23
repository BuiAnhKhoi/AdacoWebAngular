import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class buyer{
    @PrimaryGeneratedColumn()
    id:number 

    @Column({type:'varchar', length: 255})
    full_name: string 

    @Column({type:'varchar', length: 12})
    tel : string
}