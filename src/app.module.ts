import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';


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
  PostsModule,
  ImagesModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
