UPDATE comments SET is_disabled = TRUE
WHERE comments.comment_id = $1
RETURNING comment_id;

-- Syntax
-- $1 target_comment_id from reports