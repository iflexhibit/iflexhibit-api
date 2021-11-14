INSERT INTO reports 
    (target_user_id, target_post_id, target_comment_id, user_id, offense_id, report_note)
VALUES
    ( (SELECT user_id from posts WHERE post_id=$1) 
	, $1, NULL, $2, $3, $4);