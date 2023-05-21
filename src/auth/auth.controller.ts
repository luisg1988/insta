import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from 'src/users/dto/loginUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() user: loginUserDto) {
         return this.authService.signIn(user);
    }

    @Get('algo')
    @UseGuards(AuthGuard)
    async algo(@Request() req) {
        return req.user;
      }
    

}
