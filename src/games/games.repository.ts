import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './dtos/create-game.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(
    createGameDto: CreateGameDto,
    role: UserRole,
  ): Promise<Game> {
    const { title, image, genre, description, releaseDate } = createGameDto;
    const game = this.create();
    game.title = title;
    game.image = image;
    game.genre = genre;
    game.description = description;
    game.releaseDate = releaseDate;

    try {
      await game.save();
      return game;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('O Jogo já está cadastrado');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o jogo no banco de dados',
        );
      }
    }
  }
}
