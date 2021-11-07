UPDATE users
SET
    show_name = $1,
    show_contact = $2,
    show_email = $3,
    updated_at = NOW()
WHERE user_id = $4
RETURNING user_id;