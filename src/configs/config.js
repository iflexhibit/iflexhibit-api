const dotenv = require("dotenv");
dotenv.config();
const { decrypt } = require("../utils/encrypt");

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: decrypt(process.env.JWT_SECRET),
  db: {
    CONNECTION_STRING: decrypt(process.env.CONNECTION_STRING),
    COOKIE_MAXAGE: 1000 * 60 * 60,
    SESSION_SECRET: process.env.SESSION_SECRET,
    MONGO_STRING: decrypt(process.env.MONGO_STRING),
  },
  google: {
    CLIENT_ID: decrypt(process.env.CLIENT_ID),
    CLIENT_SECRET: decrypt(process.env.CLIENT_SECRET),
    SCOPE: ["profile", "email"],
  },
  cloudinary: {
    C_NAME: process.env.C_NAME,
    C_API_KEY: process.env.C_API_KEY,
    C_SECRET: process.env.C_SECRET,
  },
};
