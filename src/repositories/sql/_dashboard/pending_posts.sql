DROP VIEW IF EXISTS pending_posts;

CREATE VIEW pending_posts AS
    SELECT 
        posts.post_id,
        posts.user_id,
        users.username,
        posts.post_title,
        posts.post_body,
        posts.post_image,
        posts.post_video,
        posts.created_at
    FROM posts
    INNER JOIN users ON users.user_id = posts.user_id
    WHERE posts.status_id = 'ps1'
    ORDER BY 
        created_at ASC;
        
SELECT * FROM pending_posts;