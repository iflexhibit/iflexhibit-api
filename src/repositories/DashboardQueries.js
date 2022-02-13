module.exports = {
  fetchGeneralOverview: `SELECT * FROM general_overview;`,
  fetchPendingPosts: `SELECT * FROM pending_posts;`,
  fetchReportedPosts: `SELECT * FROM reported_posts;`,
  fetchReportedUsers: `SELECT * FROM reported_users;`,
  fetchReportedComments: `SELECT * FROM reported_comments;`,
  fetchBannedUsers: `SELECT * FROM banned_users;`,
  fetchDisabledPosts: `SELECT * FROM disabled_posts;`,
  fetchDisabledComments: `SELECT * FROM disabled_comments;`,
  banUser: `INSERT INTO bans (report_id, target_id, user_id, offense_id, ban_note, expires_at) VALUES ($1, (SELECT target_user_id FROM reports WHERE report_id = $1), $2, $3, $4, (SELECT now() + concat((SELECT ban_time FROM offenses WHERE offense_id = $3), ' days')::INTERVAL)) RETURNING ban_id;`,
  approvePost: `UPDATE posts SET status_id = 'ps2' WHERE post_id = $1 RETURNING post_id;`,
  rejectPost: `UPDATE posts SET status_id = 'ps3' WHERE post_id = $1 RETURNING post_id;`,
  disablePost: `UPDATE posts SET status_id = 'ps4' WHERE post_id = $1 RETURNING post_id;`,
  disableComment: `UPDATE comments SET is_disabled = TRUE WHERE comments.comment_id = $1 RETURNING comment_id;`,
  deleteReport: `UPDATE reports SET is_deleted=TRUE WHERE report_id=$1 RETURNING report_id;`,
  unbanUser: `DELETE FROM bans WHERE ban_id = $1 RETURNING ban_id;`,
  enableComment: `UPDATE comments SET is_disabled = FALSE WHERE comments.comment_id = $1 RETURNING comment_id;
  `,
};
