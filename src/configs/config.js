const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  db: {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    SESSION_SECRET: process.env.SESSION_SECRET,
    COOKIE_MAXAGE: 60 * 1000,
    CRYPTO_KEY: process.env.CRYPTO_KEY,
  },
  google: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SCOPE: ["profile", "email"],
  },
};
