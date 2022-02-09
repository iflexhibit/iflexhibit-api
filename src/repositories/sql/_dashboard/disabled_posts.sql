DROP VIEW IF EXISTS disabled_posts;

CREATE VIEW disabled_posts AS
    SELECT
        posts.post_id,
        posts.post_title,
        posts.user_id,
        users.username,
        posts.post_body,
        posts.post_image,
        posts.post_video,
        posts.created_at
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    WHERE posts.status_id = 'ps4'
    ORDER BY posts.post_id ASC;

SELECT * FROM disabled_posts;