UPDATE users
SET
    username = $1,
    contact = $2,
    bio = $3,
    updated_at = NOW()
WHERE user_id = $4
RETURNING user_id;