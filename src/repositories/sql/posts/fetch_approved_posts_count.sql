SELECT 
    COUNT(*) AS posts_count
FROM posts
    JOIN users ON posts.user_id = users.user_id
    JOIN poststatus ON posts.status_id = poststatus.status_id
WHERE
    posts.status_id = 'ps2'
    AND posts.is_deleted = FALSE
    AND posts.post_title ~* $1
    AND posts.post_tags LIKE $2;