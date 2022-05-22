import express from "express";
import UserController from "../controllers/user.controller";
import UserMiddleware from "../middleware/user.middleware";
import UserService from "../services/user.service";
import { body, check, validationResult } from 'express-validator';


const router = express.Router();
const controller = new UserController();

router.get("/", async (_req, res) => {
    const response = await controller.getUsers();
    console.log(`back in user.controller/get, response: ${response}`);
    return res.send(response);
});

router.get("/:id", async (req, res) => {
    var id = req.params.id;
    const response = await controller.getUser(id);
    if(!response) { 
        return res.status(404).send( { message: "No user found with id="+id });
    }
    return res.send(response);
});

router.post("/", 
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('email').isEmail(),
    body('email').custom(value => {
        
        /*
            @TODO
            this gives:    
            {"errors":[{"value":"blah@email.comkdfkdkd","msg":"Invalid value",
            "param":"email","location":"body"}]}
            and blocks user creation
        */
        // UserMiddleware.isUniqueUser 

        /* but this gives:
            {"errors":[{"value":"blah@email.comkdfkdkd","msg":"E-mail blah@email.comkdfkdkd 
            already in use","param":"email","location":"body"}]
        */
        return UserService.readByEmail(value).then(user => {
            if (user) {
              return Promise.reject(`E-mail ${user.email} already in use`);
            }
          });
        }),

    async (req: express.Request, res: express.Response) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`uh oh, we got errors on the create user request! ${errors.array()[0]}`)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            console.log(`no errors, yay! going to createUser with email=${req.body.email}, name=${req.body.name}`);
            const response = await controller.createUser(req.body)
            return res.send(response);
        }
});

export default router;