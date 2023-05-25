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
import { NOTFOUND } from 'dns';

@Injectable()
export class PostsService {
   constructor(
      @InjectRepository(posts) private _postRepository: Repository<posts>,
      @InjectRepository(users) private _userRepository: Repository<users>,
      @InjectRepository(images) private _imagesRepository: Repository<images>
      , private jwt: JwtService
   ) { }
   async hide(post: postToHide, user: users) {
      try {
         const found =
            await this._postRepository.find(
               {

                  where: {
                     userId: user.id,
                     id: post.id,
                  },
               },
            );
         if (found.length > 0) {
            const _postToEdit = new postToEdit;
            _postToEdit.id = post.id;
            _postToEdit.active = false;
            return await this._postRepository.save(_postToEdit);
         }
         else
            return new HttpException('error',HttpStatus.NOT_FOUND);
      } catch (error) {
         utility.log(error);
      }
   }

   async updateImages(_images: imagesIdList, user: users) {


      await Promise.all(
         _images.id.map(async obj => {
            const id = parseInt(obj.toString());
            const found =
               await this._postRepository.find(
                  {
                     relations: { images: true, users: true },
                     where: {
                        id: _images.postId,
                        images: { id },
                        users: { id: user.id }
                     },
                  },
               );
            if (found.length > 0) {
               const eImage = new editImage();
               eImage.active = _images.active;
               await this._imagesRepository.update({ id }, eImage);
            }
         })
      );
      return await this._postRepository.find({ where: { id: _images.postId }, relations: { images: true, users: true }, });

   }

   async updateImage(image: image, user: users) {

      const found =
         await this._postRepository.find(
            {
               relations: { images: true, users: true },
               where: {
                  images: { id: image.id },
                  users: { id: user.id }
               },
            },
         );
      if (found.length === 0) {
         throw new HttpException('error', HttpStatus.NOT_FOUND);
      }
      const id = image.id
      await this._imagesRepository.update({ id }, image);
      return await this._imagesRepository.find({ where: { id }, relations: { post: true, } },);
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

   async getPosts( user: users) {
      try {
         return await this._postRepository.find(
            {
               relations: { images: true, users: true },
               where: {
                  active: true,
                  images: { active: true },
                  users: { active: true, id: user.id}
               },
            },
         );
      } catch (error) {
         utility.log(error);
      }
   }

}
