import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports:
    [TypeOrmModule.forRoot({
      type: 'mysql',
      password: '',
      username: 'root',
      host: 'localhost',
      port: 3306,
      database: 'hola',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize : true

    }),
  UsersModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }),  
  PostsModule,
  ImagesModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
