import { IsString } from "class-validator"

export class editUserDto {
   @IsString()
   name?: string
   @IsString()
   lastname?: string

}