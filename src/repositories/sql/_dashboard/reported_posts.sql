DROP VIEW IF EXISTS reported_posts;

CREATE VIEW reported_posts AS
    SELECT 
        reports.report_id,
        reports.target_post_id,
        posts.post_title,
        posts.user_id,
        (SELECT username FROM users WHERE users.user_id = posts.user_id) AS target_username,
        reports.user_id,
        (SELECT username FROM users WHERE users.user_id = reports.user_id) AS complainee_username,
        reports.offense_id,
        offenses.offense_title,
        offenses.ban_time,
        reports.report_note,
        reports.created_at
    FROM reports
    JOIN posts ON reports.target_post_id = posts.post_id
    JOIN offenses ON reports.offense_id = offenses.offense_id
    ORDER BY reports.created_at ASC;

SELECT * FROM reported_posts;

-- basis
-- DROP VIEW IF EXISTS reported_users;

-- CREATE VIEW reported_users AS
--     SELECT 
--         reports.report_id,
--         reports.target_user_id,
--         (SELECT username FROM users WHERE users.user_id = reports.target_user_id) AS target_username,
--         reports.user_id,
--         (SELECT username FROM users WHERE users.user_id = reports.user_id) AS complainee_username,
--         reports.offense_id,
--         offenses.offense_title,
--         offenses.ban_time,
--         reports.report_note,
--         reports.created_at
--     FROM reports
--     JOIN offenses ON offenses.offense_id = reports.offense_id
--     ORDER BY reports.created_at ASC;

-- SELECT * FROM reported_users;