const { pool } = require("../configs/database");
const { encrypt } = require("../utils/encrypt");

const QUERIES = {
  create:
    "INSERT INTO users (username, given_name, family_name, email, avatar_image) VALUES ($1,$2,$3,$4,$5) RETURNING user_id",
  findByEmail: "SELECT user_id FROM users WHERE email LIKE $1",
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
    avatar_image: profile._json.picture,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.create, [
        ...Object.values(newUser),
      ]);
      return resolve(rows[0]);
    } catch (error) {
      console.error(error);
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
      const { rows, rowCount } = await pool.query(QUERIES.findByEmail, [
        encrypt(email),
      ]);
      return resolve(rows[0]);
    } catch (error) {
      console.error(error);
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

module.exports = { create, findByEmail };
