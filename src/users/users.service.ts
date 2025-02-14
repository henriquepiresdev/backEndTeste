import { UserRepository } from 'src/repository/contracts/usersContracts';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from './dto/getUserById.dto';
import { User } from 'src/@types/entities/entityUser';
import { PaginatedUserResponseDto } from './dto/getAlllUsers.dto';

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
    isSelected?: boolean,
  ): Promise<PaginatedUserResponseDto> {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, limit);
    const skip = (validPage - 1) * validLimit;

    const filter =
      isSelected !== undefined
        ? {
            isSelected:
              typeof isSelected === 'string'
                ? isSelected === 'true'
                : Boolean(isSelected),
          }
        : {};

    const [users, totalItems] = await Promise.all([
      this.userRepository.getAll(skip, validLimit, filter),
      this.userRepository.countUsers(filter),
    ]);

    const totalPages = Math.ceil(totalItems / validLimit);

    const prev = validPage > 1 ? validPage - 1 : null;
    const next = validPage < totalPages ? validPage + 1 : null;

    return {
      first: 1,
      prev,
      next,
      last: totalPages,
      pages: totalPages,
      items: totalItems,
      data: users,
    };
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
