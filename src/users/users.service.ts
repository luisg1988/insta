import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './users.entity';
import { Repository } from 'typeorm';
import { newUserDto, resetUserDto, userUtpDto } from './dto/newUser.dto';
import { editUserDto } from './dto/editUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { utility } from 'src/utility/utility'
import { JwtService } from '@nestjs/jwt';
import { deleteUserDto } from './dto/deleteUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { posts } from 'src/posts/posts.entity';
import { images } from 'src/images/images.entity';



@Injectable()
export class UsersService {


   constructor(
      @InjectRepository(users) private _repository: Repository<users>
      , private jwt:JwtService,
      private authService: AuthService,
      ) { }

   async resetPassword(user: resetUserDto)  {
      try {
         const found = await this._repository.findOneBy({ mail: user.mail });
         if (!found) {
            throw new HttpException('', HttpStatus.NOT_FOUND);
         }
         found.pass = null;
         found.active = false;
         found.utp = utility.rnd6();
         //utility.log(found.utp);
         return await this._repository.save(found);
         //todo: send mail w utp code url    
      } catch (error) {
         utility.log(error);
      }

   }

   async checkUtp(user: userUtpDto) {
      try {
         const found = await this._repository.findOneBy({ mail: user.mail, utp: user.utp });
         if (!found) {
            throw new HttpException('error', HttpStatus.NOT_FOUND);
         }
         found.pass = await utility.passHash(user.pass);
         found.active = true;
         found.utp = null;
          return await this._repository.save(found);
          //return found;
      } catch (error) {
         utility.log(error);
      }
   }

   async newUser(user: newUserDto) {
      try {
         const found = await this._repository.findOneBy({ mail: user.mail });
         if (found) {
            throw new HttpException('error', HttpStatus.CONFLICT);
         }
         const newUser = this._repository.create(user);
         newUser.pass = await utility.passHash(newUser.pass);
         utility.log(newUser.pass);
         return await this._repository.save(newUser);
      } catch (error) {
         utility.log(error);
      }
   }

   async getUsers() {
      try {
         return await this._repository.find({ relations: { posts: true, }});
      } catch (error) {
         utility.log(error);
      }
   }

   async getUser(id: number) {
      try {
         const found = await this._repository.findOneBy({ id });
         if (!found) {
            throw new HttpException('error', HttpStatus.NOT_FOUND);
         }
         return found;
      } catch (error) {
         utility.log(error);
      }
   }
 
   async editUser(id: number, _editUser: editUserDto) {
      try {
         const affected = await this._repository.update({ id }, _editUser);
         if (affected.affected === 0) {
            return new HttpException('error', HttpStatus.NOT_FOUND);
         }
         return affected;
      } catch (error) {
         utility.log(error);
      }
   }

   async getUserByMail(mail:string) {
      const found = await this._repository.findOneBy({ mail });
      return (found) 
   }

   async login(user: loginUserDto) {
      return await this.authService.signIn(user);
   }
   async delete(id: number) {
      try {
         const user = new deleteUserDto();
         user.active=false;
         const affected = await this._repository.update({ id }, user);
         if (affected.affected === 0) {
            return new HttpException('error', HttpStatus.NOT_FOUND);
         }
         return affected;
      } catch (error) {
         utility.log(error);
      }
  }

}

