SELECT 
posts.post_id,
poststatus.status_title,
users.username,
posts.post_title,
posts.post_image,
posts.post_tags,
(
    SELECT COUNT(*)
    FILTER (WHERE posts.user_id=users.user_id)
    FROM userpost 
) AS views_count,
(
    SELECT COUNT(*)
    FILTER (WHERE userpost.is_liked AND posts.post_id=userpost.post_id)
    FROM userpost
) AS likes_count,
(
    SELECT COUNT(*)
    FILTER (WHERE posts.post_id=comments.post_id AND comments.is_disabled=FALSE AND comments.is_deleted=FALSE)
    FROM comments
) AS comments_count,
posts.created_at
FROM posts
INNER JOIN comments ON posts.post_id=comments.post_id
INNER JOIN poststatus ON posts.status_id=poststatus.status_id
INNER JOIN users ON posts.user_id=users.user_id
WHERE posts.status_id=2 AND posts.is_deleted=FALSE
;