import { JoinGameDto, MakeMoveDto, StartGameDto } from "../controllers/dto/game.dto";
import { BadRequestError, NotFoundError } from "../controllers/errorHandler/httpError";
import { Game, GameStatus, IGameRepository, IGameService, IPlayerRepository } from "../interfaces";

export class GameService implements IGameService {
  constructor(private gameRepository: IGameRepository, private playerRepository: IPlayerRepository) {}

  public async startGame(data: StartGameDto): Promise<Game> {
    const { player1, startNumber, player2 } = data
    const playerOne = await this.playerRepository.findById(player1)
    if (!playerOne) {
      throw new NotFoundError('Must have at least one player')
    }

    const game = await this.gameRepository.create({ player1, player2, startNumber, next_move: player2, status: 'progress', result: startNumber, winner: null });
    // send notification to player2
    return game;
  }

  public async joinGame(gameId: string, data: JoinGameDto): Promise<string> {
    const { player2 } = data
    const game = await this.gameRepository.findById(gameId)
    if (!game) {
      throw new NotFoundError('No Game with this Id found')
    }
    if (game.player2) {
      throw new BadRequestError('Game can NOT be joined')
    }
    if (game.status === GameStatus.finished) {
      throw new NotFoundError('Game is no long available')
    }

    const updatedGame = await this.gameRepository.update(gameId, { ...game, player2, next_move: player2 });
    return updatedGame;
  }

  public async makeMove(id: string, playerId: string, data: MakeMoveDto): Promise<Game> {
    const { inputNumber } = data
    const game = await this.gameRepository.findById(id)
    if (!game) {
      throw new NotFoundError('No Game with this Id found')
    }
    if (game.status === GameStatus.finished) {
      throw new NotFoundError('Game is no long available')
    }

    const player = await this.playerRepository.findById(playerId)
    if (!player) {
      throw new NotFoundError('No Player with this Id found')
    }

    if (game.next_move && (player.id !== game.next_move)) {
      throw new BadRequestError('Not this player turn')
    }
    const next_move = game?.next_move === game.player1 ? game.player2 : game.player1;

    const gameResult = this.calculateResult(inputNumber, game.result)
    let winner = game.winner;
    let status = game.status as GameStatus
    if (gameResult === 1) {
      winner = playerId
      status = GameStatus.finished
    }

    await this.gameRepository.update(id, { next_move, winner, status, result: gameResult });
    const res = await this.gameRepository.findById(id)
    return res;
  }

  public async getGameById(id: string): Promise<Game> {
    const game = await this.gameRepository.findById(id)
    if (!game) {
      throw new NotFoundError('No Game with this Id foubd')
    }
    return game;
  }

  public async getGames(filter: any): Promise<Game[]> {
    const games = await this.gameRepository.findAll(filter)
    return games;
  }

  private calculateResult(inputNumber: number, currentResult: number): number {
    if (typeof inputNumber !== 'number' || isNaN(inputNumber)) {
      throw new Error('Input must be a valid number');
    }
    const modifiedNumber = inputNumber + currentResult;
    const result = modifiedNumber % 3 === 0 ? modifiedNumber / 3 : modifiedNumber;
    return result;
  }
}