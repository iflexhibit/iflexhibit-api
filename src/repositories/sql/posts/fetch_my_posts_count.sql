SELECT 
    COUNT(*) AS posts_count
FROM posts
    JOIN users ON posts.user_id = users.user_id
    JOIN poststatus ON posts.status_id = poststatus.status_id
WHERE posts.is_deleted = FALSE AND posts.user_id = $1;