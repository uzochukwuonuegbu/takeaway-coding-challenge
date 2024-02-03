import { GameController } from "./controllers/game.controller";
import { PlayerController } from "./controllers/player.controller";
import { IGameController, IGameRepository, IGameService, IPlayerRepository, Player, IPlayerService, IPlayerController } from "./interfaces";
import { Game } from './models';
import { GameRepository } from "./repository/game.repository";
import { PlayerRepository } from "./repository/player.repository";
import { GameService } from "./services/game.service";
import { PlayerService } from "./services/player.service";

export function getGameController(): IGameController {
    return new GameController(getGameService());
}

export function getPlayerController(): IPlayerController {
    return new PlayerController(getPlayerService());
}

export function getPlayerService(): IPlayerService {
    return new PlayerService(getPlayerRepository());
}

export function getGameService(): IGameService {
    return new GameService(getGameRepository(), getPlayerRepository());
}

export function getGameRepository(): IGameRepository {
    return new GameRepository(Game);
}

export function getPlayerRepository(): IPlayerRepository {
    return new PlayerRepository(Player);
}
