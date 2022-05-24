import express from "express";
import PingController from "../controllers/ping";
import UserRouter from "../routes/user.router";
import RoleRouter from "../routes/role.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use("/users", UserRouter);
router.use("/roles", RoleRouter);

export default router;