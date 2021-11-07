module.exports = {
  fetchPosts: `SELECT
posts.post_id,
poststatus.status_title,
users.username,
users.avatar_image,
posts.post_title,
posts.post_image,
posts.post_tags,
(
    SELECT COUNT(*)
    FILTER (WHERE posts.post_id=userpost.post_id)
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
JOIN poststatus ON posts.status_id=poststatus.status_id
JOIN users ON posts.user_id=users.user_id
WHERE posts.status_id=2 AND posts.is_deleted=FALSE
;`,
  fetchPost: `SELECT 
posts.post_id,
poststatus.status_title,
users.username,
posts.post_title,
posts.post_image,
posts.post_tags,
posts.post_body,
users.avatar_image,
users.user_id,
(
    SELECT COUNT(*)
    FILTER (WHERE posts.post_id=userpost.post_id)
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
JOIN poststatus ON posts.status_id=poststatus.status_id
JOIN users ON posts.user_id=users.user_id
WHERE posts.status_id=2 AND posts.is_deleted=FALSE AND post_id=$1;`,
  fetchComments: `SELECT 
comments.comment_id,
users.user_id,
users.username,
users.avatar_image,
CASE WHEN is_disabled=FALSE THEN comments.comment_body
ELSE 'This comment has been disabled.'
END AS comment_body,
comments.is_disabled,
comments.created_at
FROM comments
JOIN users ON comments.user_id=users.user_id
JOIN posts ON comments.post_id=posts.post_id
WHERE comments.post_id=$1;
`,
};
