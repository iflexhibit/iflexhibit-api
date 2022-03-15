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
  clearReport: `UPDATE reports SET is_deleted=TRUE WHERE report_id=$1 RETURNING report_id;`,
  unbanUser: `DELETE FROM bans WHERE ban_id = $1 RETURNING ban_id;`,
  enableComment: `UPDATE comments SET is_disabled = FALSE WHERE comments.comment_id = $1 RETURNING comment_id;
  `,
  fetchStaff: `SELECT 
  user_id,
  usertype_id,
  username,
  given_name,
  family_name,
  email,
  contact,
  created_at
  FROM users
  WHERE usertype_id = $1
  ORDER BY 
      CASE WHEN ($2 = 'username') THEN username END ASC,
      CASE WHEN ($2 = 'gname') THEN given_name END ASC,
      CASE WHEN ($2 = 'fname') THEN family_name END ASC,
      CASE WHEN ($2 = 'date') THEN created_at END ASC,
      user_id ASC;`,
  fetchMember: `SELECT 
      users.user_id,
      users.username,
      users.given_name,
      users.family_name,
      users.usertype_id,
      usertypes.usertype_title,
      users.email,
      users.contact,
      users.created_at
  FROM users
  JOIN usertypes ON usertypes.usertype_id = users.usertype_id
  WHERE users.usertype_id = 'ut1' AND users.email = $1;`,
  promoteMember: `UPDATE users 
  SET usertype_id = 'ut2'
  WHERE user_id = $1 AND usertype_id = 'ut1'
  RETURNING user_id;`,
  promoteMod: `UPDATE users 
  SET usertype_id = 'ut3'
  WHERE user_id = $1 AND usertype_id = 'ut2'
  RETURNING user_id;`,
  demoteAdmin: `UPDATE users 
  SET usertype_id = 'ut2'
  WHERE user_id = $1 AND usertype_id = 'ut3'
  RETURNING user_id;`,
  demoteMod: `UPDATE users 
  SET usertype_id = 'ut1'
  WHERE user_id = $1 AND usertype_id = 'ut2'
  RETURNING user_id;`,
  totalRows: `SELECT * FROM total_rows;`,
  validateReport: `UPDATE reports SET is_valid = TRUE WHERE report_id = $1 RETURNING report_id;`,
  fetchValidReports: `
  SELECT
    reports.report_id,
    reports.user_id,
    A.username as reportee_username, 
    reports.target_user_id,
    B.username as target_username, 
    reports.created_at,
    reports.offense_id,
    offenses.offense_title
  FROM reports
      JOIN offenses ON offenses.offense_id = reports.offense_id
      JOIN users A ON A.user_id = reports.user_id
      JOIN users B ON B.user_id = reports.target_user_id
  WHERE reports.is_valid = TRUE and B.username = $1;
  `,
  fetchPrograms: `SELECT degree_programs, updated_at FROM configs WHERE config_id  = 'cfg01';`,
  updatePrograms: `UPDATE configs SET degree_programs = $1, updated_at = NOW() WHERE config_id = 'cfg01' RETURNING config_id;`,
};
