import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, ClassSerializerInterceptor, UseInterceptors,UseGuards } from '@nestjs/common';
import { newUserDto, resetUserDto, userUtpDto } from './dto/newUser.dto';
import { UsersService } from './users.service';
import { editUserDto } from './dto/editUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { utility } from 'src/utility/utility';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthGuardAdmin } from 'src/auth/auth.guardAdmin';
import { AuthService } from 'src/auth/auth.service';



@Controller('users')

export class UsersController {

    constructor(private userService: UsersService) { }
    @Post('signUp')
    async newUser(@Body() newUser: newUserDto){
        return await this.userService.newUser(newUser);
    }

    @Post('resetPassword')
    async resetPass(@Body() user: resetUserDto){
        return await this.userService.resetPassword(user);
    }

    @Post('checkUtp')
    async checkUtp(@Body() user: userUtpDto){
        utility.log(1);
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
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.getUser(id);
    }

    // edit /users/1 + {body}
    @UseGuards(AuthGuard) 
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: editUserDto) {
        this.userService.editUser(id, user);
        return this.userService.getUser(id);
    }
//todo: duda? si quien intenta editar mi perfil es otro usuario? se vale, si no tengo q validad que sea yo mismo quien este logeado con el guard?

    @Post('signIn')
    async logIn(@Body() user: loginUserDto){
        return await this.userService.login(user);               
    }

    @UseGuards(AuthGuard) 
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        utility.log(1);
        await this.userService.delete(id);
        return this.userService.getUser(id);
    }

    
/*
@UseGuards(AuthGuard) 
    // delete /users/1
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
   // @UseGuards(AuthGuardAdmin) 
   */
}
