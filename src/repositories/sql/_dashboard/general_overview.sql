DROP VIEW IF EXISTS general_overview;

CREATE VIEW general_overview AS
    SELECT 
        (SELECT COUNT (target_user_id) FROM reports WHERE reports.offense_id LIKE 'U%' AND is_deleted=FALSE) AS reported_users,
        (SELECT COUNT (target_post_id) FROM reports WHERE reports.offense_id LIKE 'P%' AND is_deleted=FALSE) AS reported_posts,
        (SELECT COUNT (target_comment_id) FROM reports WHERE reports.offense_id LIKE 'C%' AND is_deleted=FALSE) AS reported_comments,
        (SELECT COUNT (target_id) FROM bans WHERE bans.expires_at > now()) AS banned_users,
        (SELECT COUNT (post_id) FROM posts WHERE posts.status_id = 'ps1' AND is_deleted = FALSE) AS pending_posts,
        (SELECT COUNT (post_id) FROM posts WHERE posts.status_id = 'ps4' AND is_deleted = FALSE) AS disabled_posts,
        (SELECT COUNT (comment_id) FROM comments WHERE is_disabled = TRUE) AS disabled_comments,
        (SELECT now()) AS issued_at;
        
SELECT * FROM general_overview;

-- Syntax

-- To get all 
-- SELECT * FROM general_overview;

-- To get specific value
-- SELECT * FROM general_overview.VALUE HERE BASED from the ALIASES ABOVE;


-- Also this version works

-- SELECT 
--         (SELECT COUNT (DISTINCT target_user_id) FROM reports) AS reported_users,
--         (SELECT COUNT (DISTINCT target_post_id) FROM reports) AS reported_posts,
--         (SELECT COUNT (DISTINCT target_comment_id) FROM reports) AS reported_comments,
--         (SELECT COUNT (target_id) FROM bans WHERE bans.expires_at > now()) AS banned_users,
--         (SELECT COUNT (post_id) FROM posts WHERE posts.status_id = 'ps1') AS pending_posts,
--         (SELECT COUNT (post_id) FROM posts WHERE posts.status_id = 'ps4') AS disabled_posts,
--         (SELECT COUNT (comment_id) FROM comments WHERE is_disabled = TRUE) AS disabled_comments,
--         (SELECT now()) AS issued_at;