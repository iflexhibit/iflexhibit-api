const { loggers } = require("winston");
const { pool } = require("../configs/database");
const ReportQueries = require("./ReportQueries");
const { logger } = require("../configs/logger");
const { encrypt } = require("../utils/encrypt");

function reportComment(targetCommentId, userId, offenseId, reportNote) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(ReportQueries.reportComment, [
        targetCommentId,
        userId,
        offenseId,
        reportNote,
      ]);
      if (rows.length > 0)
        logger.info(
          encrypt(
            `DB-${command} - user#${userId} created report#${rows[0].report_id}`
          )
        );
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function reportPost(targetPostId, userId, offenseId, reportNote) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(ReportQueries.reportPost, [
        targetPostId,
        userId,
        offenseId,
        reportNote,
      ]);
      if (rows.length > 0)
        logger.info(
          encrypt(
            `DB-${command} - user#${userId} created report#${rows[0].report_id}`
          )
        );
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function reportUser(targetUserId, userId, offenseId, reportNote) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, command } = await pool.query(ReportQueries.reportUser, [
        targetUserId,
        userId,
        offenseId,
        reportNote,
      ]);
      if (rows.length > 0)
        logger.info(
          encrypt(
            `DB-${command} - user#${userId} created report#${rows[0].report_id}`
          )
        );
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  reportComment,
  reportPost,
  reportUser,
};
