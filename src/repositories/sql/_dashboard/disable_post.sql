UPDATE posts 
SET status_id = 'ps4' 
WHERE post_id = $1
RETURNING post_id;

-- Syntax
-- $1 - post_id