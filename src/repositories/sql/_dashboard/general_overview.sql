-- BANS
-- banned users
-- disabled posts
-- pending posts
-- disabled comments
-- issued at

-- for reported users, posts and comments
-- I added DISTINCT to avoid duplicates

SELECT 
    COUNT (DISTINCT target_user_id) AS reported_users,
    COUNT (DISTINCT target_post_id) AS reported_posts,
    COUNT (DISTINCT target_comment_id) AS reported_comments
    FROM reports; 

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


