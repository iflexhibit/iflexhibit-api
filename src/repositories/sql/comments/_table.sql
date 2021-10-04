CREATE TABLE comments (
    "comment_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "user_id" INT NOT NULL FOREIGN KEY REFERENCES users(user_id),
    "post_id"INT NOT NULL FOREIGN KEY REFERENCES posts(post_id),
    "comment_body" TEXT NOT NULL,
    "is_disabled" BOOLEAN NOT NULL FALSE,
    "is_deleted" BOOLEAN NOT NOT NULL FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
)