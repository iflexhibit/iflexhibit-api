CREATE TABLE offenses (
    "offense_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "offense_title" VARCHAR(10) NOT NULL,
    "offense_type" CHAR(1) NOT NULL "u",
    "ban_time" CHAR(2) NOT NULL 00,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
)