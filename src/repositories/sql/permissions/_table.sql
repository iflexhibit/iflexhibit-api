CREATE TABLE permissions (
    "permission_id" CHAR(3) PRIMARY KEY,
    "submit_post" BOOLEAN NOT NULL DEFAULT FALSE,
    "comment_post" BOOLEAN NOT NULL DEFAULT FALSE,
    "moderator_access" BOOLEAN NOT NULL DEFAULT FALSE,
    "admin_access" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);