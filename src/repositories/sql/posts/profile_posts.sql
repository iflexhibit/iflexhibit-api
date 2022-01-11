SELECT 
    posts.post_id,
    posts.status_id,
	poststatus.status_title,
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
WHERE posts.user_id = $1
ORDER BY posts.updated_at DESC
LIMIT 15
OFFSET ($2-1)*15;


-- end of code
-- SYNTAX ($1 user_id, $2 page_number)