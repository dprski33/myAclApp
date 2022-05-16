import { DataSourceOptions, DataSource } from "typeorm";
import { User } from "../src/models";

const dbConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "dan",
    entities: [User],
    synchronize: true
};

export const appDataSource = new DataSource(dbConfig);
appDataSource.initialize()
    .then(() => {
        console.log(`DB connection initialized? ${appDataSource.isInitialized}`);
    })
    .catch((error) => {
        console.log("DB connection failed", error);
        process.exit(1);
    });