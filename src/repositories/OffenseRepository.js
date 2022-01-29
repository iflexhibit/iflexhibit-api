const { pool } = require("../configs/database");
const OffenseQueries = require("./OffenseQueries");

function fetchOffenses(type) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = (type) => {
        switch (type) {
          case "c":
            return OffenseQueries.fetchCommentOffenses;
          case "p":
            return OffenseQueries.fetchPostOffenses;
          case "u":
            return OffenseQueries.fetchUsersOffenses;
          default:
            throw "Invalid offense type";
        }
      };
      const { rows } = await pool.query(query(type), []);
      return resolve({ offenses: rows || [] });
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  fetchOffenses,
};
