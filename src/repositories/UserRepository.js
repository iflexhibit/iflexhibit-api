const { pool } = require("../configs/database");
const { encrypt, decrypt } = require("../utils/encrypt");

const QUERIES = {
  create:
    "INSERT INTO users (username, given_name, family_name, email) VALUES ($1,$2,$3,$4) RETURNING user_id",
  fetchEmailOne: "SELECT user_id FROM users WHERE email LIKE $1",
  fetchProfile:
    "SELECT user_id, B.usertype_title, username, CASE WHEN show_name = FALSE THEN NULL ELSE given_name END, CASE WHEN show_name = FALSE THEN NULL ELSE family_name END, CASE WHEN show_email = FALSE THEN NULL ELSE email END, CASE WHEN show_contact = FALSE THEN NULL ELSE contact END, A.avatar_image, A.background_image, A.created_at FROM users A INNER JOIN usertypes B ON A.usertype_id=B.usertype_id WHERE user_id=$1;",
};

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

function fetchProfile(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.fetchProfile, [
        userId,
      ]);

      if (!rows[0]) return resolve(null);

      const user = {
        userId: rows[0].user_id,
        usertype: rows[0].usertype_title,
        username: decrypt(rows[0].username),
        giveName: decrypt(rows[0].given_name),
        familyName: decrypt(rows[0].family_name),
        email: decrypt(rows[0].email),
        contact: decrypt(rows[0].contact),
        avatarImage: rows[0].avatar_image,
        backgroundImage: rows[0].background_image,
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

module.exports = { create, findByEmail, fetchProfile };
