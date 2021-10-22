import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGameDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Informe um título para o jogo' })
  title: string;

  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsOptional()
  genre: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe a data de lançamento do jogo' })
  releaseDate: string;
}
