import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from './dto/createUser.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedUserResponseDto, UserQueryDto } from './dto/getAlllUsers.dto';
import { UpdateUserDto } from './dto/updateUset.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criando novo usuário',
    description: 'Cria um novo usuário',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: UserResponseDto,
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.createUser(createUserDto);
    return user;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar usuário por Id',
    description: 'Retorna o usuário com o id igual ao fornecido por parametro',
  })
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
    return this.usersService.getUserById(Number(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários com paginação',
    description:
      'Retorna uma lista de usuários paginada com base nos parâmetros fornecidos.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários paginada',
    type: PaginatedUserResponseDto,
    isArray: false,
  })
  async getAllUsers(
    @Query() query: UserQueryDto,
  ): Promise<PaginatedUserResponseDto> {
    const { page, limit } = query;
    const users = await this.usersService.getAllUsers(
      Number(page),
      Number(limit),
    );
    return users;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
    description: 'Atualiza os dados de um usuário existente pelo ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário que será atualizado',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida (ex: erro de validação)',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async updateUser(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.usersService.updateUser(Number(id), data);
    return updatedUser;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser deletado',
    example: 1,
  })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @HttpCode(204)
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteUser(Number(id));
    return;
  }
}
