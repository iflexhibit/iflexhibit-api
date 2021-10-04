CREATE TABLE postStatus (
    "status_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "status_title" VARCHAR(10) NOT NULL "Pending",
    "created_at" TIMESTAMPTZ DEFAULT NOW()
)