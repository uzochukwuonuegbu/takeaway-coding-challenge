import { Game, IGameRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class GameRepository extends BaseRepository<Game> implements IGameRepository {
    constructor(dbClient: any) {
      super(dbClient);
    }

    public async createGame(data: any): Promise<Game | null> {
      const game = {
        ...data,
      }
      return this.dbClient.create(game);
    }
  }