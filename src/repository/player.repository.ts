import { Player, IPlayerRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class PlayerRepository extends BaseRepository<Player> implements IPlayerRepository {
    constructor(dbClient: any) {
      super(dbClient);
    }

    public async findOrCreate(id: string, data: any): Promise<Player | null> {
      const user = await this.dbClient.findByPk(id);
      let returnedUser = user
      if (!returnedUser) {
        returnedUser =await this.dbClient.create(data)
      }
      return returnedUser
    }
  }