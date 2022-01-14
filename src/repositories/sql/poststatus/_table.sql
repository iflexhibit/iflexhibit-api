CREATE TABLE poststatus (
    "status_id" VARCHAR(3) NOT NULL PRIMARY KEY,
    "status_title" VARCHAR(10) NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);