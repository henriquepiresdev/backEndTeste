import { TypeOrmUserRepository } from 'src/repository/typeorm/typeOrmRepository';
import { UserRepository } from 'src/repository/contracts/usersContracts';
import { UsersController } from './users.controller';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
