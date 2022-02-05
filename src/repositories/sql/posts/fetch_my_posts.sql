SELECT 
    posts.post_id,
    posts.user_id,
    poststatus.status_title,
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
WHERE posts.is_deleted = FALSE AND posts.user_id = $1
ORDER BY
    CASE WHEN ($2 = 'likes') THEN likes_count END DESC,
    CASE WHEN ($2 = 'views') THEN views_count END DESC,
    CASE WHEN ($2 = 'comments') THEN comments_count END DESC,
    posts.updated_at DESC
LIMIT 15
OFFSET ($3 - 1) * 15;