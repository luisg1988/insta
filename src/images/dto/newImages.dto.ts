import { IsBoolean, IsEmail, IsString, MinLength, Length, IsNumber, isArray, IsArray, ValidateNested, ArrayMaxSize, ArrayMinSize } from 'class-validator'
export class newImages {
   url: string
}


export class newImagesPlus {
   postId: number
   url: string
}

export class editImage {
   active: boolean;
}


export class imagesIdList {

   @IsNumber()
   postId: number

   @IsArray()
   //@ValidateNested({ each: true })
   @ArrayMinSize(1)
   @ArrayMaxSize(10)
   id: number[]

   @IsBoolean()
   active:boolean
}

export class image {

   @IsNumber()
   id: number

   @IsBoolean()
   active:boolean
}