import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { appDataSource } from "../config/database";
export { appDataSource };
import { redisConfig } from "../config/redis";

import Router from "./routes";

const PORT = 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

const swaggerDocument = require('../public/swagger.json');
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(Router);
app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}`)
});

let redisClientAvailable = true;
import { createClient } from 'redis';
const redisClient = createClient(redisConfig)
redisClient.connect()
    .then(obj => {
        console.log('Redis Connected');
      })
      .catch(error => {
        console.log('REDIS ERROR:', error);
    
        //set this to false so that the app knows to NOT cache shit
        redisClientAvailable = false;
    });
console.log(`redisClientAvailable: ${redisClientAvailable}`);

//add this after the initial connection is made so that the app does not crash if the connection is dropped
//this isn't working: https://github.com/redis/node-redis/issues/2058
// redisClient.on('error', function(er) {
//     console.log(`Lost redis connection. Falling back to non-Redis behavior: ${er}`);
//     redisClient.disconnect();
//     redisClientAvailable = false;
// });
export { redisClient, redisClientAvailable };