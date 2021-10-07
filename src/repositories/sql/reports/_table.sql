CREATE TABLE reports (
    "report_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "target_user_id" INT NOT NULL,
    "target_post_id" INT NULL NULL,
    "target_comment_id" INT NULL NULL,
    "user_id" INT NOT NULL FOREIGN KEY REFERENCES users(user_id),
    "offense_id" SMALLINT NOT NULL FOREIGN KEY REFERENCES offenses(offense_id),
    "report_note" TEXT NULL ,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
)