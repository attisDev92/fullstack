require('dotenv').config();

const PORT = process.env.PORT;

let MONGOBD = process.env.MONGODB_URI;
if(process.env.NODE_ENV == 'test') {
    MONGOBD = process.env.TEST_MONGODB_URI
}

module.exports = {
    PORT,
    MONGOBD
}