import { Router } from "express";
import { getAuthController } from "../dependency-injection";

const ctrl = getAuthController();

const router = Router({
  mergeParams: true
});

const routes = {
  register: "/auth/register",
  login: "/auth/login",
};

router.post(
    routes.register,
    ctrl.register()
);

router.post(
  routes.login,
  ctrl.login()
);

export default router;