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
email,
contact,
created_at
FROM users
WHERE usertype_id = $1
ORDER BY 
    CASE WHEN ($2 = 'username') THEN username END ASC,
    CASE WHEN ($2 = 'gname') THEN given_name END ASC,
    CASE WHEN ($2 = 'fname') THEN family_name END ASC,
    CASE WHEN ($2 = 'date') THEN created_at END ASC,
    user_id ASC;

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
WHERE users.usertype_id = 'ut1' AND users.email = $1;

-- Promote to moderator
-- $1 user_id
UPDATE users 
SET usertype_id = 'ut2'
WHERE user_id = $1 AND usertype_id = 'ut1'
RETURNING user_id;

-- Promote to administrator
-- $1 user_id
UPDATE users 
SET usertype_id = 'ut3'
WHERE user_id = $1 AND usertype_id = 'ut2'
RETURNING user_id;

-- Demote to a Moderator
-- $1 user_id
UPDATE users 
SET usertype_id = 'ut2'
WHERE user_id = $1 AND usertype_id = 'ut3'
RETURNING user_id;

-- Demote to member
-- $1 user_id
UPDATE users 
SET usertype_id = 'ut1'
WHERE user_id = $1 AND usertype_id = 'ut2'
RETURNING user_id;