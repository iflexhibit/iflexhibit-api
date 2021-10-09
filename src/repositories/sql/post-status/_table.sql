CREATE TABLE poststatus (
    "status_id" SMALLSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "status_title" VARCHAR(10) NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);