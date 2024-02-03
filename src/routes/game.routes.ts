import { Router } from "express";
import { getGameController } from "../dependency-injection";

const ctrl = getGameController();

const router = Router({
  mergeParams: true
});

const routes = {
  startGame: "/game/start",
  joinGame: "/game/:id/join",
  makeMove: "/game/:id/player/:playerId",
  getGameById: "/game/:id",
  getGames: "/game",
};

router.post(
    routes.startGame,
    ctrl.startGame()
);

router.post(
  routes.joinGame,
  ctrl.joinGame()
);

router.post(
  routes.makeMove,
  ctrl.makeMove()
);

router.get(
  routes.getGameById,
  ctrl.getGameById()
);

router.get(
  routes.getGames,
  ctrl.getGames()
);

export default router;