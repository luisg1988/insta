import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { posts } from './posts.entity';
import { users } from 'src/users/users.entity';
import { images } from 'src/images/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([posts,users,images])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
