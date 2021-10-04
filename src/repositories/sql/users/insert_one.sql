INSERT INTO users (username, given_name, family_name, email, avatar_image)
VALUES ($1,$2,$3,$4,$5)
RETURNING user_id

-- INSERT INTO users (username, given_name, family_name, email, avatar_image) VALUES ($1,$2,$3,$4,$5) RETURNING user_id