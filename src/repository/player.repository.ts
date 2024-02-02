import { Player, IPlayerRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class PlayerRepository extends BaseRepository<Player> implements IPlayerRepository {
    constructor(dbClient: any) {
      super(dbClient);
    }

    public async findByEmail(email: string): Promise<Player | null> {
      const users = await this.dbClient.findAll({ where: { email } });
      return users[0] || null;
    }
  }