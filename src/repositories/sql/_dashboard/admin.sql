-- Fetch list of moderators and administrator
-- Param
-- $1 usertype
-- ut2 or ut3
-- $2 order type
-- username, fname, lname, date
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
    CASE WHEN ($2 = 'gname') THEN given_name END ASC,
    CASE WHEN ($2 = 'fname') THEN family_name END ASC,
    CASE WHEN ($2 = 'date') THEN created_at END ASC,
user_id END ASC;

-- Fetch a member by their email address
-- Param
-- $1 email
SELECT 
    users.user_id,
    users.username,
    users.given_name,
    users.family_name,
    users.usertype_id,
    usertypes.usertype_title,
    users.email,
    users.contact,
    users.created_at
FROM users
JOIN usertypes ON usertypes.usertype_id = users.usertype_id
WHERE usertype_id = 'ut1' AND users.email = $1;




-- Promote to moderator
-- Promote to administrator
-- Demote to a Moderator
-- Demote to member