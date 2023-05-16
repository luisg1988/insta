import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class posts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tittle: string

}