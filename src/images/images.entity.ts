import { IsBoolean, IsNumber, IsString } from 'class-validator'
import { posts } from 'src/posts/posts.entity'
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity()
export class images {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    url: string

    @Column({default:true})
    @IsBoolean()
    active: boolean
    

    @Column()
    @IsNumber()
    postId:number

    @ManyToOne(() => posts, (posts) => posts.images)
    post: posts

}