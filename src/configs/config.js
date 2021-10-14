const dotenv = require("dotenv");
dotenv.config();
const { decrypt } = require("../utils/encrypt");

module.exports = {
  db: {
    CONNECTION_STRING: decrypt(process.env.CONNECTION_STRING),
    SESSION_SECRET: decrypt(process.env.SESSION_SECRET),
    COOKIE_MAXAGE: 1000 * 60 * 60,
  },
  google: {
    CLIENT_ID: decrypt(process.env.CLIENT_ID),
    CLIENT_SECRET: decrypt(process.env.CLIENT_SECRET),
    SCOPE: ["profile", "email"],
  },
};
