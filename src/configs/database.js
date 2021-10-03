const pg = require("pg");

const pool = new pg.Pool({ connectionString: process.env.CONN_STRING });

module.exports = { pool };
