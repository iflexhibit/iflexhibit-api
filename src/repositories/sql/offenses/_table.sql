CREATE TABLE offenses (
    "offense_id" CHAR(3) NOT NULL PRIMARY KEY,
    "offense_title" VARCHAR(50) NOT NULL,
    "offense_type" CHAR(1) NOT NULL DEFAULT 'u',
    "ban_time" CHAR(2) NOT NULL DEFAULT 00,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);