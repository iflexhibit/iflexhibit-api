CREATE TABLE usertypes (
    "usertype_id" CHAR(3) NOT NULL PRIMARY KEY,
    "permission_id" CHAR(3) NOT NULL REFERENCES permissions(permission_id) DEFAULT 'gue',
    "usertype_title" VARCHAR(20) NOT NULL DEFAULT 'NO ACCESS',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);