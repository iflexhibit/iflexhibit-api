CREATE TABLE usertypes (
    "usertype_id" VARCHAR(3) NOT NULL PRIMARY KEY UNIQUE,
    "permission_id" SMALLINT NOT NULL REFERENCES permissions(permission_id) DEFAULT 0,
    "usertype_title" VARCHAR(20) NOT NULL DEFAULT 'NO ACCESS',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);