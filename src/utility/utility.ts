import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { roles, users } from 'src/users/users.entity';

export class utility {
        
    static async compare(pass:string, passBd:string ) {
        return await bcrypt.compare(pass, passBd);
    }

    static log(x: any) {
        const show = true;
        show ? console.log(x.toString()) : show;
    }

    static async passHash(pass: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(pass, saltOrRounds);
    }
    static rnd6(): string {
        const number = Math.floor((Math.random() * 1000000) + 1);
        const len = 6;
        const fill = "0"
        return fill.repeat(len - number.toString().length) + number.toString();
    }

    static itsMeOrAdmin(id:number,me:users): boolean {       
        if (me.rol === roles.ADMIN || me.id === id) {
          return true; 
        }
        else {
            throw new UnauthorizedException();
        }
    }
}