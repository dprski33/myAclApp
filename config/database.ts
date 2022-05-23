import { DataSourceOptions, DataSource } from "typeorm";
import { User } from "../src/models";

const dbConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    // port: 5432,
    port: 5433, //second docker postgres instance
    username: "postgres",
    password: "mysecretpassword",
    database: "dan",
    entities: [User],
    synchronize: true
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