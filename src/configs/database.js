const pg = require("pg");
const { NODE_ENV, db } = require("./config");

const pool = new pg.Pool({
  connectionString: db.CONNECTION_STRING,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = { pool };
