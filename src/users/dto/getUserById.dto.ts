import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class IdParamDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsInt()
  id: number;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'ID do usuário.',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'Joao das Neves',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Salário do usuário.',
    example: 50000,
  })
  @IsInt()
  wage: number;

  @ApiProperty({
    description: 'Valor da empresa.',
    example: 1231,
  })
  @IsInt()
  enterprise: number;

  @ApiProperty({
    description: 'Indica se o usuário está selecionado.',
    example: true,
  })
  @IsBoolean()
  isSelected: boolean;

  @ApiProperty({
    description: 'Data de criação do usuário.',
    example: '2025-02-13T12:00:00Z',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização do usuário.',
    example: '2025-02-13T12:00:00Z',
  })
  @IsString()
  updatedAt: string;
}
