CREATE TABLE permissions (
    "permission_id" SERIAL PRIMARY KEY UNIQUE,
    "submit_post" BOOLEAN NOT NULL FALSE,
    "comment_post" BOOLEAN NOT NULL FALSE,
    "moderator_access" BOOLEAN NOT NULL FALSE,
    "admin_access" BOOLEAN NOT NULL FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
)