import express from "express";
import RoleController from "../controllers/role.controller";

const router = express.Router();
const controller = new RoleController();

router.get("/", async (_req, res) => {
    const response = await controller.getRoles();
    return res.send(response);
});

export default router;