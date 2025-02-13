import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PrismaUserRepository {
  constructor(private prisma: PrismaService) {}

  defineTransactionContext(context: Prisma.TransactionClient): void {
    this.prisma = context as PrismaService;
  }

  removeTransactionContext(): void {
    this.prisma = new PrismaService();
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async create(data: Omit<User, 'id'>): Promise<User | null> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
