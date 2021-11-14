INSERT INTO reports 
    (target_user_id, target_post_id, target_comment_id, user_id, offense_id, report_note)
VALUES
    ($1, NULL, NULL, $2, $3, $4);

-- user to user