import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, Length, MinLength, minLength } from 'class-validator'
import { Exclude } from 'class-transformer'


export enum roles {
    ADMIN,
    USER
  }

@Entity()
export class users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    @MinLength(3)
    name: string

    @Column()
    @IsString()
    @MinLength(3)
    lastname: string

    @Column(({ unique: true }))
    @IsEmail()
    mail: string

    @Column()
    @IsString()
    @MinLength(4)
    @Exclude({ toPlainOnly: true })
    pass: string
    
    @Column()
    @Length(6)
    utp:string

    @Column(({default:true}))
    @IsBoolean()
    active: boolean


    @Column({
        type: 'enum',
        enum: roles,
        default: roles.USER
      })
   
    rol: roles

}