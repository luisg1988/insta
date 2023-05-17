import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { newPost } from './dto/newPost.dto';


@Controller('posts')
export class PostsController {

    constructor(private postServices: PostsService) { }


@Get('images')
getImages()
{
    return this.getImages();
}

    @Get()
    getPosts() {
        return this.postServices.getPosts();
        //muestro un post
        //return this.userService.getPost(id);
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






}

