import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'
import { images } from 'src/images/images.entity'
import { users } from 'src/users/users.entity'
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'

@Entity()
export class posts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    tittle: string

    @Column()
    text: string

    @Column(({default:true}))
    @IsBoolean()
    active: boolean

    @Column()
    @IsNumber()
    userId:number

    // mucho a uno 
    // muchos posts () son de usuarios en posts de su uno a mucho
   @ManyToOne(() => users, (users) => users.posts)
  users: users


  @OneToMany(() => images, (images) => images.post)
  images: images[]


}