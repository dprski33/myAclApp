import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
    const controller = new UserController();
    const response = await controller.getUsers();
    return res.send(response);
});

router.get("/:id", async (req, res) => {
    var id = req.params.id;
    const controller = new UserController();
    const response = await controller.getUser(id);
    if(!response) res.status(404).send( { message: "No user found with id="+id });
    return res.send(response);
});

export default router;