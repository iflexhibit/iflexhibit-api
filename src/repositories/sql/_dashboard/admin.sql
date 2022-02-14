-- Fetch list of moderators and administrator
-- Param
-- usertype_id
-- either ut2/ut3
-- $1 usertype
-- $2 order type
-- '*%*'
SELECT 
user_id,
usertype_id,
username,
given_name,
family_name,
created_at
FROM users
WHERE usertype_id = $1
ORDER BY 
    CASE WHEN ($2 = 'username') THEN username END ASC,
    CASE WHEN ($2 = 'fname') THEN given_name END ASC,
    CASE WHEN ($2 = 'lname') THEN family_name END ASC,
    CASE WHEN ($2 = 'date') THEN created_at END ASC,
user_id ASC;



-- Fetch a member by their email address
-- Promote to moderator
-- Promote to administrator
-- Demote to a Moderator
-- Demote to member