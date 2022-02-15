const { response } = require("express");
const { pool } = require("../configs/database");
const { decrypt, encrypt } = require("../utils/encrypt");
const DashboardQueries = require("./DashboardQueries");

function fetchGeneralOverView() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        DashboardQueries.fetchGeneralOverview,
        []
      );
      const data = {
        reportedUsers: parseInt(rows[0].reported_users),
        reportedPosts: parseInt(rows[0].reported_posts),
        reportedComments: parseInt(rows[0].reported_comments),
        pendingPosts: parseInt(rows[0].pending_posts),
        bannedUsers: parseInt(rows[0].banned_users),
        disabledPosts: parseInt(rows[0].disabled_posts),
        disabledComments: parseInt(rows[0].disabled_comments),
        issuedAt: rows[0].issued_at,
      };
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchPendingPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.fetchPendingPosts, []);
      const data = rows.map((r) => ({
        id: r.post_id,
        author: {
          id: r.user_id,
          username: decrypt(r.username),
        },
        title: r.post_title,
        body: r.post_body,
        image: r.post_image,
        video: r.post_video,
        createdAt: r.created_at,
      }));
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchReportedPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        DashboardQueries.fetchReportedPosts,
        []
      );
      const data = rows.map((r) => ({
        id: r.report_id,
        target: {
          user: { id: r.target_user_id, username: decrypt(r.target_username) },
          post: { id: r.target_post_id, title: r.post_title },
        },
        reporter: { id: r.user_id, username: decrypt(r.complainee_username) },
        offense: {
          id: r.offense_id,
          title: r.offense_title,
          banTime: r.ban_time,
        },
        note: r.report_note,
        createdAt: r.created_at,
      }));
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchReportedUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        DashboardQueries.fetchReportedUsers,
        []
      );
      const data = rows.map((r) => ({
        id: r.report_id,
        target: {
          user: { id: r.target_user_id, username: decrypt(r.target_username) },
        },
        reporter: { id: r.user_id, username: decrypt(r.complainee_username) },
        offense: {
          id: r.offense_id,
          title: r.offense_title,
          banTime: r.ban_time,
        },
        note: r.report_note,
        createdAt: r.created_at,
      }));
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchReportedComments() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        DashboardQueries.fetchReportedComments,
        []
      );
      const data = rows.map((r) => ({
        id: r.report_id,
        target: {
          user: { id: r.target_user_id, username: decrypt(r.target_username) },
          comment: { id: r.target_comment_id, body: r.comment_body },
          post: { id: r.target_post_id },
        },
        reporter: { id: r.user_id, username: decrypt(r.complainee_username) },
        offense: {
          id: r.offense_id,
          title: r.offense_title,
          banTime: r.ban_time,
        },
        note: r.report_note,
        createdAt: r.created_at,
      }));
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchBannedUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.fetchBannedUsers, []);
      const data = rows.map((r) => ({
        id: r.ban_id,
        target: {
          user: { id: r.target_id, username: decrypt(r.banned_user) },
        },
        reporter: { id: r.user_id, username: decrypt(r.complainee_username) },
        offense: {
          id: r.offense_id,
          title: r.offense_title,
        },
        note: r.ban_note,
        createdAt: r.created_at,
        expiresAt: r.expires_at,
      }));
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchDisabledPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        DashboardQueries.fetchDisabledPosts,
        []
      );

      const data = rows.map((r) => ({
        id: r.post_id,
        title: r.post_title,
        author: {
          id: r.user_id,
          username: decrypt(r.username),
        },
        body: r.post_body,
        image: r.post_image,
        video: r.post_video,
        createdAt: r.created_at,
      }));

      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchDisabledComments() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        DashboardQueries.fetchDisabledComments,
        []
      );

      const data = rows.map((r) => ({
        id: r.comment_id,
        body: r.comment_body,
        author: {
          id: r.user_id,
          username: decrypt(r.username),
        },
        post: r.post_id,
        createdAt: r.created_at,
      }));

      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function banUser(reportId, userId, offenseId, banNote) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.banUser, [
        reportId,
        userId,
        offenseId,
        banNote,
      ]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function approvePost(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.approvePost, [postId]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function rejectPost(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.rejectPost, [postId]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function disablePost(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.disablePost, [postId]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function disableComment(commentId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.disableComment, [
        commentId,
      ]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function unbanUser(banId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.unbanUser, [banId]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function enableComment(commentId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.enableComment, [
        commentId,
      ]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function clearReport(reportId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.clearReport, [
        reportId,
      ]);
      return resolve(rows.length > 0);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchStaff(usertype, sort = "id") {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.fetchStaff, [
        usertype,
        sort,
      ]);

      const users = rows.map((r) => ({
        id: r.user_id,
        username: decrypt(r.username),
        givenName: decrypt(r.given_name),
        familyName: decrypt(r.family_name),
        createdAt: r.created_at,
      }));

      return resolve(users);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchMember(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(DashboardQueries.fetchMember, [
        encrypt(email),
      ]);

      if (!rows.length > 0) return resolve(null);

      const user = {
        id: rows[0].user_id,
        username: decrypt(rows[0].username),
        givenName: decrypt(rows[0].given_name),
        familyName: decrypt(rows[0].family_name),
        usertype: rows[0].usertype_title,
        email: decrypt(rows[0].email),
        contact: decrypt(rows[0].contact),
        createdAt: rows[0].created_at,
      };

      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  fetchGeneralOverView,
  fetchPendingPosts,
  fetchReportedPosts,
  fetchReportedUsers,
  fetchReportedComments,
  fetchBannedUsers,
  fetchDisabledPosts,
  fetchDisabledComments,
  banUser,
  approvePost,
  rejectPost,
  disablePost,
  disableComment,
  unbanUser,
  enableComment,
  clearReport,
  fetchStaff,
  fetchMember,
};
