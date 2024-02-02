import { Router } from 'express';
import gameRoutes from './game.routes';
import playerRoutes from './player.routes';

const router = Router();

router.use(
  gameRoutes,
  playerRoutes
);

export default router;