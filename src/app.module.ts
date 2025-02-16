import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import typeOrmConfig from './config/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig.options,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
  ],
})
export class AppModule {}
