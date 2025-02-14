import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsOptional, IsBoolean, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserResponseDto } from './createUser.dto';
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

  @ApiProperty({
    description: 'Filtra os usuários pelo campo isSelected',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isSelected?: boolean;
}

export class PaginatedUserResponseDto {
  @ApiProperty({
    description: 'Número da primeira página.',
    example: 1,
  })
  first: number;

  @ApiProperty({
    description: 'Número da página anterior, se existir.',
    example: 1,
    nullable: true,
  })
  prev?: number | null;

  @ApiProperty({
    description: 'Número da próxima página, se existir.',
    example: 2,
    nullable: true,
  })
  next?: number | null;

  @ApiProperty({
    description: 'Número da última página.',
    example: 9,
  })
  last: number;

  @ApiProperty({
    description: 'Número total de páginas.',
    example: 9,
  })
  pages: number;

  @ApiProperty({
    description: 'Total de itens no banco.',
    example: 82,
  })
  items: number;

  @ApiProperty({
    description: 'Lista de usuários.',
    type: [UserResponseDto],
  })
  data: UserResponseDto[];
}
