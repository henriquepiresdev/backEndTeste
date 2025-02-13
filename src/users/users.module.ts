import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaUserRepository } from 'src/repository/prisma/userRepository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PrismaUserRepository],
})
export class UsersModule {}
