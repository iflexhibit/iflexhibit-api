SELECT 
    posts.post_id,
    posts.status_id,
    posts.user_id,
    users.username,
    users.avatar_image,
    likes_count,
    views_count,
    comments_count,
    posts.post_title,
    posts.post_tags,
    posts.post_image,
    posts.created_at,
    posts.updated_at
FROM posts
JOIN users ON posts.user_id = users.user_id
JOIN poststatus ON posts.status_id = poststatus.status_id
WHERE posts.status_id = 'ps2' AND posts.is_deleted = FALSE AND posts.user_id = $1
ORDER BY CASE
    WHEN $2 = 1 THEN likes_count END DESC,
    WHEN $2 = 2 THEN views_count END DESC,
    WHEN $2 = 3 THEN comments_count END DESC,
    posts.updated_at DESC
LIMIT 15
OFFSET ($3 - 1) * 15;

-- SYNTAX ($1 user_id, $2 order_pattern, $3 page_number)
-- Types of order type ($4) : 
-- 1 - order thru likes
-- 2 - order thru views
-- 3 - order thru comments