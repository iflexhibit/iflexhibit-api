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
FROM posts
JOIN users ON post.user_id users.user_id
JOIN poststatus ON posts.status_id=poststatus.status_id
WHERE posts.status_id = 2 AND posts.is_deleted = FALSE;