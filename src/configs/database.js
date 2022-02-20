const pg = require("pg");
const { NODE_ENV, db } = require("./config");
const mongoose = require("mongoose");

const pool = new pg.Pool({
  connectionString: db.CONNECTION_STRING,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
  if (mongoose.connection.readyState > 0) return;
  await mongoose.connect(db.MONGO_STRING);
};

module.exports = { pool, connectDB };
