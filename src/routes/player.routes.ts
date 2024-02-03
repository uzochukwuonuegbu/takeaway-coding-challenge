import { Router } from "express";
import { getPlayerController } from "../dependency-injection";

const ctrl = getPlayerController();

const router = Router({
  mergeParams: true
});

const routes = {
  register: "/players/register",
  getPlayerById: "/players/:id",
  getPlayers: "/players"
};

router.get(
  routes.getPlayerById,
  ctrl.getPlayerById()
);

router.get(
  routes.getPlayers,
  ctrl.getPlayers()
);

router.post(
    routes.register,
    ctrl.registerPlayer()
);

export default router;