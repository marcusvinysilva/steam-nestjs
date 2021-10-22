import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Get,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { CreateGameDto } from './dtos/create-game.dto';
import { ReturnGameDto } from './dtos/return-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { GamesService } from './games.service';
import { UpdateGameDto } from './dtos/update-game.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('games')
@UseGuards(AuthGuard(), RolesGuard)
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post('createGame')
  @Role(UserRole.ADMIN)
  @ApiBody({ type: CreateGameDto })
  async createGame(
    @Body(ValidationPipe) createGameDto: CreateGameDto,
  ): Promise<ReturnGameDto> {
    const game = await this.gamesService.createGame(createGameDto);
    return {
      game,
      message: 'Jogo cadastrado com sucesso',
    };
  }

  @Get('findGames')
  async findGames() {
    return this.gamesService.findGames();
  }

  @Get('findGameById/:id')
  @Role(UserRole.ADMIN)
  async findGameById(@Param('id') id: string): Promise<ReturnGameDto> {
    const game = await this.gamesService.findGameById(id);
    return {
      game,
      message: 'Jogo encontrado',
    };
  }

  @Patch('updateGame/:id')
  @ApiBody({ type: UpdateGameDto })
  async updateGame(
    @Body(ValidationPipe) updateGameDto: UpdateGameDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.gamesService.updateGame(updateGameDto, id);
    }
  }

  @Delete('deleteGame/:id')
  @Role(UserRole.ADMIN)
  async deleteGame(@Param('id') id: string) {
    await this.gamesService.deleteGame(id);
    return { message: 'Jogo excluído com sucesso' };
  }
}
