UPDATE comments SET is_disabled = FALSE
WHERE comments.comment_id = $1;

-- Syntax
-- $1 target_comment_id from reports