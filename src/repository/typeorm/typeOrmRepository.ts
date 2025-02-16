import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserContract, UserRepository } from '../contracts/usersContracts';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    data: Omit<UserContract, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserContract | null> {
    const newUser = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(newUser);
    return this.convertToUserContract(savedUser);
  }

  async getById(id: number): Promise<UserContract | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? this.convertToUserContract(user) : null;
  }

  async getAll(
    skip: number,
    take: number,
    filter?: { isSelected?: boolean },
  ): Promise<UserContract[]> {
    const users = await this.userRepository.find({
      skip,
      take,
      where: filter,
    });
    return users.map(this.convertToUserContract);
  }

  async countUsers(filter?: { isSelected?: boolean }): Promise<number> {
    return this.userRepository.count({
      where: filter,
    });
  }

  async update(id: number, data: Partial<UserContract>): Promise<UserContract> {
    await this.userRepository.update(id, data);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) throw new Error('User not found');
    return this.convertToUserContract(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private convertToUserContract(user: UserEntity): UserContract {
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
}
