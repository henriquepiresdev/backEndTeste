import { User as UserContract } from '../../../src/@types/entities/entityUser';
import { UserRepository } from '../contracts/usersContracts';
import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<UserContract, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserContract | null> {
    const createdUser = await this.prisma.user.create({
      data,
    });
    return this.convertToUserContract(createdUser);
  }

  async getById(id: number): Promise<UserContract | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;
    return this.convertToUserContract(user);
  }

  async getAll(
    skip: number,
    take: number,
    filter?: { isSelected?: boolean },
  ): Promise<UserContract[]> {
    const users = await this.prisma.user.findMany({
      skip,
      take,
      where: filter,
    });
    return users.map(this.convertToUserContract);
  }
  async countUsers(filter?: { isSelected?: boolean }): Promise<number> {
    return this.prisma.user.count({
      where: filter,
    });
  }
  async update(id: number, data: Partial<UserContract>): Promise<UserContract> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.convertToUserContract(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private convertToUserContract(user: User): UserContract {
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
