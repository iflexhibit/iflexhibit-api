INSERT INTO users (username, given_name, family_name, email)
VALUES ($1,$2,$3,$4)
RETURNING user_id;

-- INSERT INTO users (username, given_name, family_name, email) VALUES ($1,$2,$3,$4) RETURNING user_id