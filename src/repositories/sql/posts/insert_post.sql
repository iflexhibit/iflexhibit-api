INSERT INTO posts (user_id, post_title, post_body, post_image, post_video, post_tags)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING post_id;