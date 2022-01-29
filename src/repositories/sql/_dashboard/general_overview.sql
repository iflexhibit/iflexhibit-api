-- BANS
-- banned users
-- disabled posts
-- pending posts
-- disabled comments
-- issued at

-- for reported users, posts and comments

-- SELECT LEFT (offense_id, 1) = 'U' FROM reports;

-- SELECT
--     (SELECT COUNT (target_user_id) FROM reports WHERE offenses.offense_type = 'u' AND is_deleted = FALSE) AS reported_users,
--     (SELECT COUNT (target_post_id) FROM reports WHERE offenses.offense_type = 'p' AND is_deleted = FALSE) AS reported_posts,
--     (SELECT COUNT (target_comment_id) FROM reports WHERE offenses.offense_type = 'c' AND is_deleted = FALSE) AS reported_comments
--     FROM reports
--     INNER JOIN offenses ON reports.offense_id = offenses.offense_id
--     GROUP BY reported_users, reported_posts, reported_comments;


-- for banned users
-- note: the reason for adding is_deleted is because
-- those reports with TRUE means it's "resolved"
-- same reason in the bans below for making target_post/user/comment_id for making it the param

SELECT 
    COUNT (target_id) AS banned_users
    FROM bans
    WHERE expires_at > now();

-- note: I've placed target_id so that
-- it would only count as one user
-- even if the said user is
-- banned multiple times.


