import { RecordExistsError } from "../controllers/errorHandler/httpError";
import { IPlayerRepository, IPlayerService } from "../interfaces";

export class PlayerService implements IPlayerService {
  constructor(private playerRepository: IPlayerRepository) {}

    public async register(email: string): Promise<{ playerId: string }> {
      const existingUser = await this.playerRepository.findByEmail(email);
      if (existingUser) {
          throw new RecordExistsError('Player already exists');
      }
      const player = await this.playerRepository.create({ email });
      return { playerId: player.id }
    }
}