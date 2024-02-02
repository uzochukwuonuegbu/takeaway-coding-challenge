import { Router } from "express";
import { getGameController } from "../dependency-injection";

const ctrl = getGameController();

const router = Router({
  mergeParams: true
});

const routes = {
  startGame: "/games",
  joinGame: "/games/:id/join",
  getGames: "/games",
  getGameById: "/games/:id",
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