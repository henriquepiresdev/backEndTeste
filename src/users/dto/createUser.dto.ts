import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuario.',
    example: 'Joao das neves',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Sálario.',
    example: 50000,
  })
  @IsInt()
  wage: number;

  @ApiProperty({
    description: 'valor da empresa',
    example: 1,
  })
  @IsInt()
  enterprise: number;

  @ApiProperty({
    description: 'indica se esta selecionado',
    example: true,
  })
  @IsBoolean()
  isSelected: boolean;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do usuario.',
    example: 'Joao das neves',
  })
  name: string;

  @ApiProperty({
    description: 'Sálario.',
    example: 50000,
  })
  wage: number;

  @ApiProperty({
    description: 'valor da empresa',
    example: 3261,
  })
  enterprise: number;

  @ApiProperty({
    description: 'indica se esta selecionado',
    example: true,
  })
  isSelected: boolean;

  @ApiProperty({
    description: 'data de criação.',
    example: '2025-02-13T12:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2025-02-13T12:00:00Z',
  })
  updatedAt: string;
}
