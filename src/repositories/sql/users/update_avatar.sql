UPDATE users
SET
avatar_image=$1,
updated_at= (SELECT NOW())
WHERE user_id=$2
RETURNING user_id;