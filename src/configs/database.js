const pg = require("pg");
const { db } = require("./config");

const pool = new pg.Pool({ connectionString: db.CONNECTION_STRING });

module.exports = { pool };
