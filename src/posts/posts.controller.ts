import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, ClassSerializerInterceptor, Request,UseInterceptors, UseGuards, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { newPost, postToHide } from './dto/newPost.dto';
import { images } from 'src/images/images.entity';
import { image, imagesIdList } from 'src/images/dto/newImages.dto';
import { utility } from 'src/utility/utility';
import { AuthGuard } from 'src/auth/auth.guard';
import { posts } from './posts.entity';


@Controller('posts')
export class PostsController {

    constructor(private postServices: PostsService) { }

    @Get('images')
    getImages() :Promise<images[]> {
        return this.getImages();
    }

    @UseGuards(AuthGuard)
    @Get('listPost')
    getPosts(@Request() req) :Promise<posts[]> {
        return this.postServices.getPosts(req.user);
    }


    @UseGuards(AuthGuard)
    @Post('newPost')
    async newPost(@Body() x: newPost, @Request() req):Promise<posts> {       
        if (utility.itsMeOrAdmin(x.userId, req.user))
           return await this.postServices.newPost(x);        
    }

    @UseGuards(AuthGuard)
    @Post('updateImages')
    async updateImages(@Body() img: imagesIdList,@Request() req):Promise<posts> {
        return await this.postServices.updateImages(img, req.user);
    }

    @UseGuards(AuthGuard)
    @Post('updateImage')
    async updateImage(@Body() img: image,@Request() req):Promise<images> {
        return await this.postServices.updateImage(img,req.user);
    }

    @UseGuards(AuthGuard)
    @Put('hidePost')
    async hidePost(@Body() post: postToHide,@Request() req):Promise<posts> {
        return await this.postServices.hide(post,req.user);
    }






}

