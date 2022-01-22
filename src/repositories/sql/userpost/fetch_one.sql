SELECT * 
FROM userpost 
WHERE userpost.user_id = $1 AND userpost.post_id = $2;

-- SYNTAX
-- $1 user_id
-- $2 post_id
-- Status: In Progress
-- Findings: (1-22-22)