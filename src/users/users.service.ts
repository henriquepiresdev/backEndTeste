import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaUserRepository } from 'src/repository/prisma/userRepository';
import { UserResponseDto } from './dto/getUserById.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async createUser(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User | null> {
    return await this.userRepository.create(data);
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      wage: user.wage,
      enterprise: user.enterprise,
      isSelected: user.isSelected,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async getAllUsers(page: number = 1, limit: number = 10): Promise<User[]> {
    const validPage = page < 1 ? 1 : page;
    const validLimit = limit < 1 ? 10 : limit;
    const skip = (validPage - 1) * validLimit;
    return this.userRepository.getAll(skip, Number(validLimit));
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return await this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
