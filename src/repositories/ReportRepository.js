const { pool } = require("../configs/database");
const ReportQueries = require("./ReportQueries");

function reportComment(targetCommentId, userId, offenseId, reportNote) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(ReportQueries.reportComment, [
        targetCommentId,
        userId,
        offenseId,
        reportNote,
      ]);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
}

function reportPost(targetPostId, userId, offenseId, reportNote) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(ReportQueries.reportPost, [
        targetPostId,
        userId,
        offenseId,
        reportNote,
      ]);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
}

function reportUser(targetUserId, userId, offenseId, reportNote) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(ReportQueries.reportUser, [
        targetUserId,
        userId,
        offenseId,
        reportNote,
      ]);
      return resolve();
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
