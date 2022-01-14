CREATE TABLE posts (
    "post_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "status_id" VARCHAR(3) NOT NULL REFERENCES poststatus(status_id) DEFAULT 'ps1',
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "post_title" VARCHAR(100) NOT NULL,
    "post_body" TEXT DEFAULT NULL,
    "post_image" TEXT NOT NULL,
    "post_video" TEXT DEFAULT NULL,
    "post_tags" TEXT DEFAULT NULL,
    "likes_count" INT DEFAULT 0,
    "comments_count" INT DEFAULT 0,
    "views_count" INT DEFAULT 0,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);