import { IsEmail, IsString, MinLength } from 'class-validator'
export class loginUserDto {
    @IsEmail()
    mail: string
    @IsString()
   @MinLength(4)
    pass: string
 }