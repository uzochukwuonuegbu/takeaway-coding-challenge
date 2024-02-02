import { Game, IGameRepository, IGameService } from "../interfaces";

export class GameService implements IGameService {
  constructor(private gameRepository: IGameRepository) {}

  public async startGame(data: any): Promise<Game> {
    const { categoryIds = [] } = data;
    const gameResult = await this.gameRepository.create(data);
    return gameResult as Game;
  }

  public async joinGame(filter: any): Promise<Game> {
      const res = await this.gameRepository.findById(filter || {});
      return res as Game;
  }
}