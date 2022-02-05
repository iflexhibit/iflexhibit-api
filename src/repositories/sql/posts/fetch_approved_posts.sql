SELECT 
    posts.post_id,
    posts.status_id,
    poststatus.status_title,
    posts.user_id,
    users.username,
    users.avatar_image,
    posts.likes_count,
    posts.views_count,
    posts.comments_count,
    posts.post_title,
    posts.post_tags,
    posts.post_image,
    posts.created_at,
    posts.updated_at
FROM posts
JOIN users ON posts.user_id = users.user_id
JOIN poststatus ON posts.status_id = poststatus.status_id
WHERE posts.status_id = 'ps2' AND posts.is_deleted = FALSE
AND posts.post_title ~* $1 AND posts.post_tags LIKE $2
ORDER BY 
    CASE WHEN ($3 = 'likes') THEN likes_count END DESC,
    CASE WHEN ($3 = 'views') THEN views_count END DESC,
    CASE WHEN ($3 = 'comments') THEN comments_count END DESC,
    posts.updated_at DESC
LIMIT 15
OFFSET ($4 - 1 ) * 15;

-- end of code
-- SYNTAX ($1 post_title, $2 post_tags, $3 order_pattern, $4 page_number)
-- Types of order type ($3) : 
-- 1 - order thru likes
-- 2 - order thru views
-- 3 - order thru comments