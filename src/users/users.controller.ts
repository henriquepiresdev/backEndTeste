import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto, UserResponseDto } from './dto/createUser.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criando novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: UserResponseDto,
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.createUser(createUserDto);
    return user
      ? {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }
      : null;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: UserResponseDto,
  })
  async getUserById(@Param('id') id: number): Promise<UserResponseDto | null> {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<User[]> {
    return this.usersService.getAllUsers(page, limit);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
