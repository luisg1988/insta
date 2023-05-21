import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { newPost, postToHide } from './dto/newPost.dto';
import { images } from 'src/images/images.entity';
import { image, imagesIdList } from 'src/images/dto/newImages.dto';


@Controller('posts')
export class PostsController {

    constructor(private postServices: PostsService) { }

@Get('images')
getImages()
{
    return this.getImages();
}

    @Get('listPost')
    getPosts() {
        return this.postServices.getPosts();        
    }

    //not to use
    @Get('query')
    getPostsQuery() {
        return this.postServices.getPostsQuery();      
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return 'muestro un post';
        //return this.userService.getPost(id);
    }

    @Post('newPost')
    async newPost(@Body() x: newPost){
                
        return await this.postServices.newPost(x);
    }

    @Post('updateImages')
    async updateImages(@Body() img: imagesIdList){                
        return await this.postServices.updateImages(img);
    }

    @Post('updateImage')
    async updateImage(@Body() img: image){                
        return await this.postServices.updateImage(img);
    }


    @Post('hidePost')
    async hidePost(@Body() post: postToHide){        
        return await this.postServices.hide(post);
    }






}

