import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IGameController, IGameService } from "../interfaces";
import logger from '../log.service';

export class GameController implements IGameController {
    constructor(private gameService: IGameService) {
    }

    public startGane(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.gameService.startGame({});
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
                // TODO: add query from request
                const result = await this.gameService.joinGame({});
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
                const result = await this.gameService.joinGame({});
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to join game', {error: err})
                next(err);
            }
        }
    }
}