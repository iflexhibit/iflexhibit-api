const morgan = require("morgan");
const winston = require("winston");
const { encrypt } = require("../utils/encrypt");
require("winston-mongodb");

const { db, NODE_ENV } = require("./config");

const logger = winston.createLogger({
  transports: [
    new winston.transports.MongoDB({
      db: db.MONGO_STRING,
      collection: "logs",
      options: { useUnifiedTopology: true },
    }),
  ],
});

morgan.token("message", (req, res) => res.locals.errorMessage || "");

const getIpFormat = () => (NODE_ENV === "production" ? ":remote-addr - " : "");
const successResponseFormat = `${getIpFormat()}:method :status :url - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :status :url - :response-time ms`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) =>
    res.statusCode >= 400 || ["GET", "OPTIONS"].includes(req.method),
  stream: { write: (message) => logger.info(encrypt(message.trim())) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) =>
    res.statusCode < 400 || ["GET", "OPTIONS"].includes(req.method),
  stream: { write: (message) => logger.error(encrypt(message.trim())) },
});

module.exports = {
  successHandler,
  errorHandler,
  logger,
};
