UPDATE users 
SET 
background_image = $1
WHERE user_id = $2
RETURNING user_id;