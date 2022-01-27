SELECT is_liked
FROM userpost 
WHERE userpost.user_id = $1 AND userpost.post_id = $2;

-- SYNTAX
-- $1 post_id
-- $2 user_id