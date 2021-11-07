UPDATE users
SET
username = $1,
contact = $2,
bio = $3,
updated_at= (SELECT NOW())
WHERE user_id=$4;