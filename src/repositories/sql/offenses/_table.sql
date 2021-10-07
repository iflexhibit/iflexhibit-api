CREATE TABLE offenses (
    "offense_id" SMALLSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "offense_title" VARCHAR(10) NOT NULL,
    "offense_type" CHAR(1) NOT NULL "u",
    "ban_time" CHAR(2) NOT NULL DEFAULT 00,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);