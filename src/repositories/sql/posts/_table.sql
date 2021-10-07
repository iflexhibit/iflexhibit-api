CREATE TABLE posts (
    "post_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "status_id" SMALLINT NOT NULL FOREIGN KEY REFERENCES poststatus(status_id),
    "user_id" INT NOT NULL FOREIGN KEY REFERENCES users(user_id),
    "post_title" VARCHAR(100) NOT NULL,
    "post_body" TEXT DEFAULT NULL,
    "post_image" TEXT NOT NULL,
    "post_video" TEXT DEFAULT NULL,
    "post_tags" TEXT DEFAULT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
)