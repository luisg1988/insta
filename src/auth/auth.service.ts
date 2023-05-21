import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginUserDto } from 'src/users/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { utility } from 'src/utility/utility';
import { Repository } from 'typeorm';
import { users } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(users) private _repository: Repository<users>,
    private jwtService: JwtService
  ) { }

  async signIn(_user: loginUserDto): Promise<any> {
    const user = await this._repository.findOneBy({ mail: _user.mail });
    if (!await utility.compare(_user.pass, user.pass))
      throw new UnauthorizedException();
    const payload = { name: user.name, id: user.id , rol:user.rol };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
