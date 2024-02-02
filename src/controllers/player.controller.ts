import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IPlayerController, IPlayerService } from "../interfaces";
import logger from '../log.service';

export class PlayerController implements IPlayerController {
    constructor(private playerService: IPlayerService) {
    }

    public register(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email } = req.body;
                const token = await this.playerService.register(email);
                res.status(201).json({ token, status: 201, message: 'success' });
            } catch (err) {
                logger.errorLog('Unable to register user', {error: err})
                next(err);
            }
        }
    }
}