export interface UserContract {
  id: number;
  name: string;
  wage: number;
  enterprise: number;
  isSelected: boolean;
  createdAt: string;
  updatedAt: string;
}
export abstract class UserRepository {
  abstract create(
    data: Omit<UserContract, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserContract | null>;

  abstract getById(id: number): Promise<UserContract | null>;

  abstract getAll(
    skip: number,
    take: number,
    filter?: { isSelected?: boolean },
  ): Promise<UserContract[]>;

  abstract update(
    id: number,
    data: Partial<UserContract>,
  ): Promise<UserContract>;

  abstract delete(id: number): Promise<void>;

  abstract countUsers(filter?: { isSelected?: boolean }): Promise<number>;
}
