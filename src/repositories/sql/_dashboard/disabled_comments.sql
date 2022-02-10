DROP VIEW IF EXISTS disabled_comments;

CREATE VIEW disabled_comments AS
    SELECT
        comments.comment_id,
        comments.comment_body,
        comments.user_id,
        users.username,
        comments.post_id,
        comments.created_at
    FROM comments
    JOIN users ON users.user_id = comments.user_id
    WHERE is_disabled = TRUE
    ORDER BY comments.comment_id ASC;

SELECT * FROM disabled_comments;