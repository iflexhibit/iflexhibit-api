module.exports = {
  reportComment: `
  INSERT INTO reports 
    (target_user_id, target_post_id, target_comment_id, user_id, offense_id, report_note)
  VALUES
    ((SELECT user_id from comments WHERE comment_id=$1), (SELECT post_id from comments WHERE comment_id=$1), $1, $2, $3, $4) RETURNING report_id;
    `,
  reportPost: `
  INSERT INTO reports 
    (target_user_id, target_post_id, target_comment_id, user_id, offense_id, report_note)
  VALUES
    ((SELECT user_id from posts WHERE post_id=$1), $1, NULL, $2, $3, $4) RETURNING report_id;
    `,
  reportUser: `
  INSERT INTO reports 
    (target_user_id, target_post_id, target_comment_id, user_id, offense_id, report_note)
  VALUES
    ($1, NULL, NULL, $2, $3, $4) RETURNING report_id;
    `,
};
