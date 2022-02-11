module.exports = {
  fetchGeneralOverview: `SELECT * FROM general_overview;`,
  fetchPendingPosts: `SELECT * FROM pending_posts;`,
  fetchReportedPosts: `SELECT * FROM reported_posts;`,
  fetchReportedUsers: `SELECT * FROM reported_users;`,
  fetchReportedComments: `SELECT * FROM reported_comments;`,
  banUser: `INSERT INTO bans (report_id, target_id, user_id, offense_id, ban_note, expires_at) VALUES ($1, (SELECT target_user_id FROM reports WHERE report_id = $1), $2, $3, $4, (SELECT now() + concat((SELECT ban_time FROM offenses WHERE offense_id = $3), ' days')::INTERVAL)) RETURNING ban_id;`,
  approvePost: `UPDATE posts SET status_id = 'ps2' WHERE post_id = $1 RETURNING post_id;`,
  rejectPost: `UPDATE posts SET status_id = 'ps3' WHERE post_id = $1 RETURNING post_id;`,
};
