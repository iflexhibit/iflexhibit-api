const dotenv = require("dotenv");
dotenv.config();
const { decrypt } = require("../utils/encrypt");

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: decrypt(process.env.JWT_SECRET),
  db: {
    CONNECTION_STRING: decrypt(process.env.CONNECTION_STRING),
    COOKIE_MAXAGE: 1000 * 60 * 60,
  },
  google: {
    CLIENT_ID: decrypt(process.env.CLIENT_ID),
    CLIENT_SECRET: decrypt(process.env.CLIENT_SECRET),
    SCOPE: ["profile", "email"],
  },
};
