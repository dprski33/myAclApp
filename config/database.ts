import { DataSourceOptions, DataSource } from "typeorm";
import { User, Role } from "../src/models";

const dbConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    // port: 5432,
    port: 5433, //second docker postgres instance
    username: "postgres",
    password: "mysecretpassword",
    database: "dan",
    entities: [User, Role],

    //only set to true if we aren't seeding the db via docker compose
    synchronize: false,
    //https://orkhan.gitbook.io/typeorm/docs/logging
    logging: "all"
};

export const appDataSource = new DataSource(dbConfig);
console.log(`Trying to connect to db=${dbConfig.database} on port=${dbConfig.port}`);
appDataSource.initialize()
    .then(() => {
        console.log(`DB connection initialized for db=${dbConfig.database} on port ${dbConfig.port}? ${appDataSource.isInitialized}`);
    })
    .catch((error) => {
        console.log("DB connection failed", error);
        process.exit(1);
    });