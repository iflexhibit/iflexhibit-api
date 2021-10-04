CREATE TABLE userPost (
    "userpost_id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "user_id" INT NOT NULL FOREIGN KEY REFERENCES users(users_id),
    "post_id" INT NOT NULL FOREIGN KEY REFERENCES posts(post_id),
    "is_liked" BOOLEAN NOT NULL FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
)