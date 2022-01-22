UPDATE userpost 
SET is_liked = TRUE 
WHERE userpost.post_id = $1 AND userpost.user_id = $2;

-- Syntax
--  $1 post_id (the post being liked)
-- $2 user_id (the user liking the post)
-- Status: In Progress; Subject for Testing
-- Findings: (1-22-22)