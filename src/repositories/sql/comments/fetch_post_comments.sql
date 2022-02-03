SELECT 
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
  WHERE comments.post_id = $1 AND comments.is_deleted=FALSE
  ORDER BY comments.created_at DESC;