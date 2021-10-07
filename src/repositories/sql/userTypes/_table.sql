CREATE TABLE usertypes (
    "usertype_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "permission_id" INT NOT NULL REFERENCES permissions(permission_id) 0,
    "usertype_title" VARCHAR(20) NOT NULL DEFAULT 'NO ACCESS',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);