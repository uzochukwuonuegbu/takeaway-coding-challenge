import { Router } from "express";
import { getGameController } from "../dependency-injection";

const ctrl = getGameController();

const router = Router({
  mergeParams: true
});

const routes = {
  startGame: "/game/start",
  joinGame: "/game/:id/join",
  makeMove: "/game/:id/:playerId",
  getGameById: "/game/:id",
};

router.post(
    routes.startGame,
    ctrl.startGane()
);

router.post(
  routes.startGame,
  ctrl.joinGame()
);

router.get(
  routes.getGameById,
  ctrl.getGameById()
);

export default router;