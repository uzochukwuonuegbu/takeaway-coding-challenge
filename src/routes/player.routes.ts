import { Router } from "express";
import { getPlayerController } from "../dependency-injection";

const ctrl = getPlayerController();

const router = Router({
  mergeParams: true
});

const routes = {
  register: "/player/register",
};

router.post(
    routes.register,
    ctrl.register()
);

export default router;