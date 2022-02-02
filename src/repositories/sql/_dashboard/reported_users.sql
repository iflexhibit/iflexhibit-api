DROP VIEW IF EXISTS reported_users;

CREATE VIEW reported_users AS
    SELECT 
        reports.report_id,
        reports.target_user_id,
        (SELECT username FROM users WHERE users.user_id = reports.target_user_id) AS target_username,
        reports.user_id,
        (SELECT username FROM users WHERE users.user_id = reports.user_id) AS complainee_username,
        reports.offense_id,
        (SELECT offense_title FROM offenses WHERE offenses.offense_id = reports.offense_id) AS offense_title,
        (SELECT ban_time FROM offenses WHERE offenses.offense_id = reports.offense_id),
        reports.report_note,
        reports.created_at
    FROM reports
    ORDER BY reports.created_at ASC;

SELECT * FROM reported_users;

-- DROP VIEW IF EXISTS pending_posts;

-- CREATE VIEW pending_posts AS
--     SELECT 
--         posts.post_id,
--         posts.user_id,
--         users.username,
--         posts.post_title,
--         posts.post_body,
--         posts.post_image,
--         posts.post_video,
--         posts.created_at
--     FROM posts
--     INNER JOIN users ON users.user_id = posts.user_id
--     WHERE posts.status_id = 'ps1'
--     ORDER BY 
--         created_at DESC;
-- SELECT * FROM pending_posts;