import express from "express";
import UserController from "../controllers/user.controller";
import UserMiddleware from "../middleware/user.middleware";
import { body, validationResult, param } from 'express-validator';


const router = express.Router();
const controller = new UserController();

router.get("/", async (req, res) => {
    var queryLimit = Number(req.query?.limit);
    var queryOffset = Number(req.query?.offset);

    const response = await controller.getUsers(queryLimit, queryOffset);
    console.log(`back in user.controller/get, response: ${response}`);
    return res.send(response);
});

router.get("/:id", 
    param('id').isNumeric(),
    async (req, res) => {
        var id = req.params?.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        const response = await controller.getUser(id);
        if(!response) { 
            return res.status(404).send( { message: `No user found with id=${id}`} );
        }
        return res.send(response);
});

router.post("/", 
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('email').isEmail(),
    body('email').custom(UserMiddleware.isUniqueUser),
    async (req: express.Request, res: express.Response) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`uh oh, we got errors on the create user request! ${errors.array().map(el => el['msg']).toString()}`);
            return res.status(400).json({ errors: errors.mapped() });
        }
        console.log(`no errors, yay! going to createUser with email=${req.body.email}, name=${req.body.name}`);
        const response = await controller.createUser(req.body)
        return res.send(response);
    });

router.put("/:id", 
    body('email').custom(UserMiddleware.emailExistsOtherUser),
    async (req: express.Request, res: express.Response) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`uh oh, we got errors on the update user request! ${errors.array().map(el => el['msg']).toString()}`);
            return res.status(400).json({ errors: errors.mapped() });
        }
        var id = req.params?.id;
        //case where PUT to /users/null?
        const response = await controller.updateUser(id, req.body);
        if(!response) { 
            return res.status(404).send( { message: `No user found with id=${id}` } );
        }
        return res.send(response);
    });

router.get("/:id/roles",
    param('id').isNumeric(),
    async (req, res) => {
        var id = req.params?.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        const response = await controller.getUserRoles(id);
        if(!response) { 
            return res.status(404).send( { message: `No user found with id=${id}`} );
        }
        return res.send(response);
    });

export default router;