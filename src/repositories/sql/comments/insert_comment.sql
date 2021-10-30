INSERT INTO comments (user_id, post_id, comment_body)
VALUES ($1, $2, $3)
RETURNING comment_id;