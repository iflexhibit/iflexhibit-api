INSERT INTO reports 
    (target_user_id, target_post_id, target_comment_id, user_id, offense_id, report_note)
VALUES
    ((SELECT user_id from posts WHERE post_id=$1), $1, NULL, $2, $3, $4);

-- $1 -- ID of the post being reported
-- $2 -- ID of the user submitting the report
-- $3 -- Offense ID
-- $4 -- Report Note