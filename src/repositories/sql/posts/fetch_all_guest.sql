SELECT 
posts.post_id,
poststatus.status_title,
users.username,
posts.post_title,
posts.post_image,
post_tags,
(
    SELECT COUNT(*)
    FROM userpost
) AS views_count,
(
    SELECT COUNT(*)
    FILTER (WHERE is_liked)
    FROM userpost
) AS likes_count,
(
    SELECT COUNT(*)
    FROM comments
) AS comments_count,
posts.created_at
FROM posts
INNER JOIN poststatus ON posts.status_id=poststatus.status_id
INNER JOIN users ON posts.user_id=users.user_id
WHERE posts.status_id=2 AND is_deleted=FALSE
;
