import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsOptional, IsBoolean, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UserQueryDto {
  @ApiProperty({
    description: 'Número da página',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Quantidade de usuários por página',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João das Neves',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Salário do usuário',
    example: 50000,
  })
  @IsInt()
  wage: number;

  @ApiProperty({
    description: 'Valor da empresa',
    example: 3261,
  })
  @IsInt()
  enterprise: number;

  @ApiProperty({
    description: 'Indica se o usuário está selecionado',
    example: true,
  })
  @IsBoolean()
  isSelected: boolean;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2025-02-13T12:00:00Z',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização do usuário',
    example: '2025-02-13T12:00:00Z',
  })
  @IsString()
  updatedAt: string;
}
