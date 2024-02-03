import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IGameController, IGameService } from "../interfaces";
import logger from '../log.service';
import { JoinGameDto, MakeMoveDto, StartGameDto } from "./dto/game.dto";
import { startGameSchema } from "./validators/game.validator";

export class GameController implements IGameController {
    constructor(private gameService: IGameService) {
    }

    public startGame(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = startGameSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    logger.errorLog('Unable to start game', {error: errorMessage})
                    res.status(400).json({ message: errorMessage });
                }
                const result = await this.gameService.startGame(value);
                res.status(201).json({ status: 201, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to start game', {error: err})
                next(err);
            }
        }
    }

    public joinGame(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params
                const { player2 }: JoinGameDto = req.body
                const result = await this.gameService.joinGame(id, { player2 });
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to join game', {error: err})
                next(err);
            }
        }
    }

    public makeMove(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id, playerId } = req.params
                const { inputNumber }: MakeMoveDto = req.body
                const result = await this.gameService.makeMove(id, playerId, { inputNumber });
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to join game', {error: err})
                next(err);
            }
        }
    }

    public getGameById(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // TODO: add query from request
                const result = await this.gameService.getGameById(req.params.id);
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to get game by ID', {error: err})
                next(err);
            }
        }
    }

    public getGames(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // TODO: add query from request
                const result = await this.gameService.getGames({});
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to get games', {error: err})
                next(err);
            }
        }
    }
}