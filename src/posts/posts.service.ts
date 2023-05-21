import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { posts } from './posts.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { newPost, postToEdit, postToHide } from './dto/newPost.dto';
import { utility } from 'src/utility/utility';
import { images } from 'src/images/images.entity';
import { users } from 'src/users/users.entity';
import { editImage, image, imagesIdList, newImages, newImagesPlus } from 'src/images/dto/newImages.dto';

@Injectable()
export class PostsService {
   constructor(
      @InjectRepository(posts) private _postRepository: Repository<posts>,
      @InjectRepository(users) private _userRepository: Repository<users>,
      @InjectRepository(images) private _imagesRepository: Repository<images>
      , private jwt: JwtService
   ) { }
   async hide(post: postToHide) {

      const _postToEdit = new postToEdit;
      _postToEdit.id = post.id;
      _postToEdit.active = false;

      return await this._postRepository.save(_postToEdit);
   }

   async updateImages(_images: imagesIdList) {
      //todo: ver si se puede hacer un IN y un where el post id sea
      /*
      //TODO: Intento failll
         const postId= _images.postId;
         const imagesIds =  _images.id;
         this._imagesRepository.createQueryBuilder()
         .update(images)
         .set({ active: _images.active })
         .where("id IN(:...ids)", { ids: imagesIds })
         //.where({id: In(_images.id),})
         .andWhere('postId = :postId', { postId })
         .execute;
         */

      await Promise.all(
         _images.id.map(async obj => {
            const id = parseInt(obj.toString());
            const eImage = new editImage();
            eImage.active = _images.active;
            await this._imagesRepository.update({ id }, eImage);
            //console.log(obj.toString());
         })
      );
      return await this._postRepository.find({ where: { id: _images.postId }, relations: ['images', 'user'], });

   }

   async updateImage(image: image) {
      const id = image.id
      await this._imagesRepository.update({ id }, image);
      //console.log(obj.toString());       
      return await this._imagesRepository.find({ where: { id }, relations: ['post'], });
   }


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

   async getPosts() {
      try {        
         return await this._postRepository.find(
            { relations: { images: true, user: true }, 
            where: { 
               active: true, 
               images: { active: true }, 
               user: { active: true } 
            },
          },
         );

          /*
         return await this._postRepository.find(
            { where: { active: false }, relations: ['user', 'images'] }
         );
           old code
         */


      } catch (error) {
         utility.log(error);
      }
   }
//code to get whit query
   async getPostsQuery() {
      const active:boolean = true;
      return await this._imagesRepository.createQueryBuilder('i')
         .leftJoinAndSelect('posts', 'p', 'p.id = i.postId')
         .leftJoinAndSelect('users', 'u', 'u.id = p.userId')
         .where('i.active = :active', { active })
         .andWhere('p.active = :active', { active })
         .andWhere('u.active = :active', { active })
         //.getQuery();
         .execute();
      //console.log(A);


   }

}
