import { NotFoundError } from "../controllers/errorHandler/httpError";
import { IPlayerRepository, IPlayerService, Player } from "../interfaces";

export class PlayerService implements IPlayerService {
  constructor(private playerRepository: IPlayerRepository) {}

    public async register(data: any): Promise<{ playerId: string }> {
      const player = await this.playerRepository.create(data)
      return { playerId: player.id }
    }

    public async getPlayerById(id: string): Promise<Player> {
      const player = await this.playerRepository.findById(id)
      if (!player) {
        throw new NotFoundError('No Player with this Id found')
      }
      return player;
    }

    public async getPlayers(filter: any): Promise<Player[]> {
      const players = await this.playerRepository.findAll(filter)
      return players;
    }
}