SELECT * 
FROM userpost 
WHERE userpost.post_id = $1 AND userpost.user_id = $2;

-- SYNTAX
-- $1 post_id
-- $2 user_id