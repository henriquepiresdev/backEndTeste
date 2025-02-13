import { User } from 'src/@types/entities/entityUser';
export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User | null>;
  abstract getById(id: number): Promise<User | null>;
  abstract getAll(skip: number, take: number): Promise<User[]>;
  abstract update(id: number, data: Partial<User>): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
