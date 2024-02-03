import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IPlayerController, IPlayerService } from "../interfaces";
import logger from '../log.service';

export class PlayerController implements IPlayerController {
    constructor(private playerService: IPlayerService) {
    }

    public registerPlayer(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email } = req.body;
                const { playerId } = await this.playerService.register(email);
                res.status(201).json({ playerId, status: 201, message: 'success' });
            } catch (err) {
                logger.errorLog('Unable to register user', {error: err})
                next(err);
            }
        }
    }

    public getPlayerById(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // TODO: add query from request
                const result = await this.playerService.getPlayerById(req.params.id);
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to get game by ID', {error: err})
                next(err);
            }
        }
    }

    public getPlayers(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // TODO: add query from request
                const result = await this.playerService.getPlayers({});
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to get games', {error: err})
                next(err);
            }
        }
    }
}