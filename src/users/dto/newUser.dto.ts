import { IsBoolean, IsEmail, IsString, MinLength, Length } from 'class-validator'

export class newUserDto {
   @IsString()
   @MinLength(3)
   name: string

   @IsString()
   @MinLength(3)
   lastname: string

   @IsEmail()
   mail: string

   @IsString()
   @MinLength(4)  
   pass: string      
}

export class resetUserDto {
   @IsEmail()
   mail: string
}

export class userUtpDto {
   @IsEmail()
   mail: string
   @Length(6)
   utp:string
   @IsString()
   @MinLength(4)  
   pass: string  
}


