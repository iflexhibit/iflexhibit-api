INSERT INTO reports 
    (target_user_id, target_post_id, target_comment_id, user_id, offense_id, report_note)
VALUES
    ( (SELECT user_id from comments WHERE comment_id=$1) 
	, NULL, $1, $2, $3, $4);