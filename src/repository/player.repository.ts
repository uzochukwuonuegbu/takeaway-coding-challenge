import { Player, IPlayerRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class PlayerRepository extends BaseRepository<Player> implements IPlayerRepository {
    constructor(dbClient: any) {
      super(dbClient);
    }

    public async findByEmailOrCreate(email: string): Promise<Player | null> {
      const users = await this.dbClient.findAll({ where: { email } });
      let returnedUser = users[0] || null
      if (!returnedUser) {
        returnedUser =await this.dbClient.create({ email })
      }
      return returnedUser
    }
  }