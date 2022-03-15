CREATE TABLE configs (
    "config_id" CHAR(5) PRIMARY KEY,
    "degree_programs" TEXT[],
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);