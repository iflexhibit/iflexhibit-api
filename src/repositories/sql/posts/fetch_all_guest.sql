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
    posts.created_at
FROM posts
JOIN users ON posts.user_id = users.user_id
JOIN poststatus ON posts.status_id = poststatus.status_id
WHERE posts.status_id = 2 AND posts.is_deleted = FALSE
AND posts.post_title ~* $1 AND posts.post_tags LIKE $2
ORDER BY CASE
    WHEN $3 = 1 THEN likes_count
    WHEN $3 = 2 THEN views_count
    WHEN $3 = 3 THEN comments_count
    ELSE post_id
END DESC
LIMIT 15
OFFSET ($4-1)*15;

-- end of code
-- SYNTAX ($1 post_title, $2 post_tags, $3 order_pattern, $4 page_number)
-- Types of order type ($3) : 
-- 1 - order thru likes
-- 2 - order thru views
-- 3 - order thru comments