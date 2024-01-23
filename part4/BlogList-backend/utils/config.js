require('dotenv').config();

const PORT = process.env.PORT;
const MONGOBD = process.env.MONGODB_URI;

module.exports = {
    PORT,
    MONGOBD
}