CREATE TABLE comments (
    "comment_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "post_id"INT NOT NULL REFERENCES posts(post_id),
    "comment_body" TEXT NOT NULL,
    "is_disabled" BOOLEAN NOT NULL DEFAULT FALSE,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);