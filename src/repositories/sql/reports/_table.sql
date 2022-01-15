CREATE TABLE reports (
    "report_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "target_user_id" INT NOT NULL REFERENCES users(user_id),
    "target_post_id" INT DEFAULT NULL REFERENCES posts(post_id) NULL,
    "target_comment_id" INT DEFAULT NULL REFERENCES comments(comment_id) NULL,
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "offense_id" CHAR(3) NOT NULL REFERENCES offenses(offense_id),
    "report_note" TEXT DEFAULT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);