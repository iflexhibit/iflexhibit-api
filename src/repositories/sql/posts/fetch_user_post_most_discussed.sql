SELECT 
    posts.post_id,
    posts.status_id,
    posts.user_id,
    users.username,
    users.avatar_image,
    (
        SELECT COUNT(*)
        FILTER (WHERE userpost.is_liked AND posts.post_id=userpost.post_id)
        FROM userpost
    ) as likes_count,
    (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id=userpost.post_id)
        FROM userpost 
    ) AS views_count,
    (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id=comments.post_id AND comments.is_disabled=FALSE AND comments.is_deleted=FALSE)
        FROM comments
    ) AS comments_count,
    posts.post_title,
    posts.post_image,
    posts.created_at
FROM posts
JOIN users ON posts.user_id = users.user_id
JOIN poststatus ON posts.status_id = poststatus.status_id
WHERE posts.status_id = 2 AND posts.is_deleted = FALSE AND posts.user_id = $1
ORDER BY comments_count DESC
LIMIT 15
OFFSET ($2-1)*15;

-- $1 user's id
-- $2 page number;