let _username = "default";
let _password = "foobared";
let _host = "localhost";
// let _port = 6379;
let _port = 6380; //second redis docker instance

export const redisConfig = {
    url: `redis://${_username}:${_password}@${_host}:${_port}`,
    setTimeout: 100
};
