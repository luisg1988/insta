import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { newUserDto, resetUserDto, userUtpDto } from './dto/newUser.dto';
import { UsersService } from './users.service';
import { editUserDto } from './dto/editUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthGuardAdmin } from 'src/auth/auth.guardAdmin';
import { roles, users } from './users.entity';
import { utility } from 'src/utility/utility';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }
    @Post('signUp')
    async newUser(@Body() newUser: newUserDto) {
        return await this.userService.newUser(newUser);
    }

    @Post('resetPassword')
    async resetPass(@Body() user: resetUserDto) {
        return await this.userService.resetPassword(user);
    }

    @Post('checkUtp')
    async checkUtp(@Body() user: userUtpDto) {
        return await this.userService.checkUtp(user);
    }

    @UseGuards(AuthGuardAdmin)
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @UseGuards(AuthGuard)
    // get /users/1
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
        if (utility.itsMeOrAdmin(id, req.user))        
            return this.userService.getUser(id);      
    }

    // edit /users/1 + {body}
    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: editUserDto, @Request() req) {
        if (utility.itsMeOrAdmin(id, req.user))
        {
            await this.userService.editUser(id, user);
            return await this.userService.getUser(id);
        }        
    }

    @Post('logIn')
    async logIn(@Body() user: loginUserDto) {
        return await this.userService.login(user);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
        if (utility.itsMeOrAdmin(id, req.user))
        {
            await this.userService.delete(id);
            return this.userService.getUser(id);
        }        
    }
}
