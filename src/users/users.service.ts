import { UserRepository } from 'src/repository/contracts/usersContracts';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from './dto/getUserById.dto';
import { User } from 'src/@types/entities/entityUser';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User | null> {
    return this.userRepository.create(data);
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('Usuário Não Encontrado');
    }
    return user;
  }

  async getAllUsers(
    page: number = 1,
    limit: number = 10,
  ): Promise<UserResponseDto[]> {
    const validPage = page < 1 ? 1 : page;
    const validLimit = limit < 1 ? 10 : limit;
    const skip = (validPage - 1) * validLimit;
    const users = await this.userRepository.getAll(skip, validLimit);
    return users;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('Usuário Não Encontrado');
    }
    await this.userRepository.delete(id);
  }
}
