
const EXPRESS_SERVER_PORT = 3000;

//After 'X' num of hours, JWT token will be expired
const NUM_OF_HOURS_FOR_JWT_TOKEN = '2400h';

const PERMISSIONS_LEVELS = ["Level 1", "Level 2", "Level 3"];

const USER_PERMISSIONS_BY_LEVEL = {
    1: ["CREATE", "READ", "WRITE", "UPDATE"],
    2: ["CREATE", "READ", "WRITE", "UPDATE"],
    3: ["CREATE", "READ", "WRITE", "UPDATE"]
}

const CLIENT_EMAIL = "frank@qse.co";

module.exports = {
    PERMISSIONS_LEVELS,
    USER_PERMISSIONS_BY_LEVEL,
    EXPRESS_SERVER_PORT,
    NUM_OF_HOURS_FOR_JWT_TOKEN,
    CLIENT_EMAIL

}


