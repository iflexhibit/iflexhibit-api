CREATE TABLE bans(
    "ban_id" SMALLSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "report_id" INT NOT NULL FOREIGN KEY REFERENCES reports(report_id),
    "target_id" INT NOT NULL FOREIGN KEY REFERENCES users(user_id),
    "user_id" INT NOT NULL FOREIGN KEY REFERENCES users(user_id),
    "offense_id" INT NOT NULL FOREIGN KEY REFERENCES offenses(offense_id),
    "ban_note" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
)