import { images } from "src/images/images.entity"
import { IsBoolean, IsEmail, IsString, MinLength, Length, IsNumber, isArray, IsArray, ValidateNested, ArrayMaxSize, ArrayMinSize } from 'class-validator'
import { Type } from "class-transformer"
import { newImages } from "src/images/dto/newImages.dto"


export class newPost {
    @IsNumber()
    userId: number
    @IsString()
    tittle: string
    @IsString()
    text: string
    @IsArray()
    //@ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => newImages)
    images: newImages[]

}