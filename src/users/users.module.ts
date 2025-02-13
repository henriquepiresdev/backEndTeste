import { PrismaUserRepository } from 'src/repository/prisma/userRepository';
import { UserRepository } from 'src/repository/contracts/usersContracts';
import { PrismaService } from 'prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    PrismaUserRepository,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
