const { pool } = require("../configs/database");
const { encrypt, decrypt } = require("../utils/encrypt");

const QUERIES = {
  create:
    "INSERT INTO users (username, given_name, family_name, email) VALUES ($1,$2,$3,$4) RETURNING user_id",
  fetchEmailOne: "SELECT user_id FROM users WHERE email LIKE $1",
  fetchBasic:
    "SELECT user_id, B.usertype_title, username, A.avatar_image, A.created_at FROM users A INNER JOIN usertypes B ON A.usertype_id=B.usertype_id WHERE user_id=$1;",
};

/**
 * @param {import("passport").Profile} profile Profile object
 * @returns {Promise} Returns the field `user_id` of the newly created user
 * @description Creates a new `user` in the database with the `profile` provided by Google Sign-In
 */
function create(profile) {
  const newUser = {
    username: encrypt(generateUsername(profile._json.name)),
    given_name: encrypt(profile._json.given_name),
    family_name: encrypt(profile._json.family_name),
    email: encrypt(profile._json.email),
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.create, [
        ...Object.values(newUser),
      ]);
      return resolve(rows[0]);
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * @param {*} email Email from `profile._json.email`
 * @returns {Promise} Returns the fields `user_id`, `username`, `email` in an object
 * @description Finds a `user` in the database that matches the `email`
 */
function findByEmail(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.fetchEmailOne, [
        encrypt(email),
      ]);
      if (!rows[0]) return resolve(null);
      const user = {
        userId: rows[0].user_id,
      };
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchUserBasic(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.fetchBasic, [userId]);

      if (!rows[0]) return resolve(null);

      const user = {
        userId: rows[0].user_id,
        usertype: rows[0].usertype_title,
        username: decrypt(rows[0].username),
        avatarImage: rows[0].avatar_image,
        createdAt: rows[0].created_at,
      };

      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

function generateUsername(fullname) {
  const initials = fullname
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  const rng = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);

  return [initials, rng].join("");
}

module.exports = { create, findByEmail, fetchUserBasic };
