import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { posts } from './posts.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { newPost } from './dto/newPost.dto';
import { utility } from 'src/utility/utility';
import { images } from 'src/images/images.entity';
import { users } from 'src/users/users.entity';
import { newImages, newImagesPlus } from 'src/images/dto/newImages.dto';

@Injectable()
export class PostsService {
   constructor(
      @InjectRepository(posts) private _postRepository: Repository<posts>,
      @InjectRepository(users) private _userRepository: Repository<users>,
      @InjectRepository(images) private _imagesRepository: Repository<images>
      , private jwt: JwtService
   ) { }

   async newPost(newPost: newPost) {
      try {
         const userFound = this._userRepository.findOneBy({ id: newPost.userId });
         if (!userFound) {
            return new HttpException('user', HttpStatus.NOT_FOUND);
         }
         const post = this._postRepository.create(newPost);
         const postSaved = await this._postRepository.save(post);
         await Promise.all(
            newPost.images.map(async obj => {
               const img = new newImagesPlus();
               img.postId = postSaved.id;
               img.url = obj.toString();
               const imgToSave = this._imagesRepository.create(img);
               await this._imagesRepository.save(imgToSave);
            })
         );
         return await this._postRepository.find({ where: { id: postSaved.id }, relations: ['images', 'user'], });
      } catch (error) {
         utility.log(error);
      }
   }
   getPost(id: number) {
      throw new Error('Method not implemented.');
   }

   async getPosts() {
      try {
         return await this._postRepository.find(
            { relations: ['user', 'images'] }
         );
      } catch (error) {
         utility.log(error);
      }
   }

}
