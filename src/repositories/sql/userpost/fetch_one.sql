SELECT * 
FROM userpost 
WHERE userpost.post_id = $1 AND userpost.user_id = $2;

-- SYNTAX
-- $1 user_id
-- $2 post_id
-- Status: In Progress
-- Findings: Working (1-22-22)