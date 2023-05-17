import { posts } from 'src/posts/posts.entity'
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity()
export class images {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    postId:number

    @ManyToOne(() => posts, (posts) => posts.images)
    post: posts

}