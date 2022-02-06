DROP VIEW IF EXISTS reported_comments;

CREATE VIEW reported_comments AS
    SELECT 
        reports.report_id,
        reports.target_comment_id,
        comments.comment_body,
        reports.target_user_id,
        (SELECT username FROM users WHERE users.user_id = reports.target_user_id) AS target_username,
        reports.user_id,
        (SELECT username FROM users WHERE users.user_id = reports.user_id) AS complainee_username,
        reports.offense_id,
        offenses.offense_title,
        offenses.ban_time,
        reports.report_note,
        reports.created_at
    FROM reports
    JOIN comments ON comments.comment_id = reports.target_comment_id
    JOIN offenses ON offenses.offense_id = reports.offense_id
    WHERE offenses.offense_type = 'c'
    ORDER BY reports.created_at ASC;

SELECT * FROM reported_comments;