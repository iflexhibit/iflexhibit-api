const { pool } = require("../configs/database");
const { decrypt } = require("../utils/encrypt");
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

module.exports = {
  fetchGeneralOverView,
  fetchPendingPosts,
  fetchReportedPosts,
  fetchReportedUsers,
  fetchReportedComments,
};
