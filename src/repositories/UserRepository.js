const { pool } = require("../configs/database");
const { logger } = require("../configs/logger");
const { encrypt, decrypt } = require("../utils/encrypt");
const UserQueries = require("./UserQueries");

function create(profile) {
  const newUser = {
    username: encrypt(generateUsername(profile._json.name)),
    given_name: encrypt(profile._json.given_name),
    family_name: encrypt(profile._json.family_name),
    email: encrypt(profile._json.email),
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(UserQueries.create, [
        ...Object.values(newUser),
      ]);
      if (!rows[0]) return resolve(null);
      const user = {
        id: rows[0].user_id,
      };
      logger.info(encrypt(`DB-${command} - user#${rows[0].user_id} created`));
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

function findByEmail(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(UserQueries.fetchEmailOne, [
        encrypt(email),
      ]);
      if (!rows[0]) return resolve(null);
      const user = {
        id: rows[0].user_id,
      };
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

function findByUsername(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(UserQueries.fetchUsername, [
        encrypt(username),
      ]);
      if (!rows[0]) return resolve(null);
      return resolve(rows[0].user_id);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchMe(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(UserQueries.fetchMe, [userId]);

      if (!rows[0]) return resolve(null);
      if (rows[0].usertype_title === "banned")
        pool.query(UserQueries.updateUsertype, [userId]);
      else pool.query(UserQueries.updateBan, [userId]);

      const user = {
        id: rows[0].user_id,
        usertype: rows[0].usertype_title,
        username: decrypt(rows[0].username),
        name: {
          given: decrypt(rows[0].given_name),
          family: decrypt(rows[0].family_name),
        },
        email: decrypt(rows[0].email),
        contact: decrypt(rows[0].contact),
        bio: rows[0].bio,
        avatar: decrypt(rows[0].avatar_image),
        background: decrypt(rows[0].background_image),
        preferences: {
          showName: rows[0].show_name,
          showEmail: rows[0].show_email,
          showContact: rows[0].show_contact,
        },
        permissions: {
          submitPost: rows[0].submit_post,
          commentPost: rows[0].comment_post,
          moderatorAccess: rows[0].moderator_access,
          adminAccess: rows[0].admin_access,
        },
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
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
      const { rows } = await pool.query(UserQueries.fetchProfile, [userId]);

      if (!rows[0]) return resolve(null);
      if (rows[0].usertype_title === "banned")
        pool.query(UserQueries.updateUsertype, [userId]);
      else pool.query(UserQueries.updateBan, [userId]);

      const user = {
        id: rows[0].user_id,
        usertype: rows[0].usertype_title,
        username: decrypt(rows[0].username),
        name: {
          given: decrypt(rows[0].given_name),
          family: decrypt(rows[0].family_name),
        },
        email: decrypt(rows[0].email),
        contact: decrypt(rows[0].contact),
        bio: rows[0].bio,
        avatar: decrypt(rows[0].avatar_image),
        background: decrypt(rows[0].background_image),
        preferences: {
          showName: rows[0].show_name,
          showEmail: rows[0].show_email,
          showContact: rows[0].show_contact,
        },
        statistics: {
          views: parseInt(rows[0].views_received || 0),
          likes: parseInt(rows[0].likes_received || 0),
        },
        createdAt: rows[0].created_at,
      };

      if (user.usertype === "banned") {
        const bans = await pool.query(UserQueries.fetchUserBans, [userId]);
        if (bans.rows.length > 0) {
          user.bans = bans.rows.map((r) => r.offense_title);
          user.banExpire = bans.rows[0].expires_at;
        }
      }

      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

function insertComment(userId, postId, commentBody) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(UserQueries.insertComment, [
        userId,
        postId,
        commentBody,
      ]);
      if (!rows[0]) return resolve(null);
      const comment = { id: rows[0].comment_id };
      logger.info(
        encrypt(
          `DB-${command} - user#${userId} created comment#${rows[0].comment_id}`
        )
      );
      return resolve(comment);
    } catch (error) {
      return reject(error);
    }
  });
}

function updatePreferences(userId, showName, showContact, showEmail) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(
        UserQueries.updatePreferences,
        [showName, showContact, showEmail, userId]
      );
      const user = {
        userId: rows[0].user_id,
      };

      if (rows.length > 0)
        logger.info(
          encrypt(`DB-${command} - user#${userId} updated preferences`)
        );
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

function updateProfile(userId, username, contact, bio) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(UserQueries.updateProfile, [
        encrypt(username),
        encrypt(contact),
        bio,
        userId,
      ]);
      const user = { userId: rows[0].user_id };

      if (rows.length > 0)
        logger.info(encrypt(`DB-${command} - user#${userId} updated profile`));
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

function updateAvatar(userId, image) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(UserQueries.updateAvatar, [
        encrypt(image),
        userId,
      ]);

      if (rows.length > 0)
        logger.info(encrypt(`DB-${command} - user#${userId} updated avatar`));
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function updateBackground(userId, image) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(UserQueries.updateBackground, [
        encrypt(image),
        userId,
      ]);
      if (rows.length > 0)
        logger.info(
          encrypt(`DB-${command} - user#${userId} updated background`)
        );
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function deleteComment(commentId, userId) {
  return new Promise(async (resolve, reject) => {
    if (isNaN(parseInt(commentId))) throw "Invalid comment id";
    try {
      const { rows, command } = await pool.query(UserQueries.deleteComment, [
        commentId,
        userId,
      ]);
      if (!rows[0]) return resolve(false);
      logger.info(
        encrypt(
          `DB-${command} - user#${userId} deleted comment#${rows[0].comment_id}`
        )
      );
      return resolve(true);
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  create,
  findByEmail,
  findByUsername,
  fetchMe,
  fetchProfile,
  insertComment,
  updatePreferences,
  updateProfile,
  updateAvatar,
  updateBackground,
  deleteComment,
};

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
