CREATE TABLE userTypes (
    "usertype_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "permission_id" INT NOT NULL FOREIGN KEY REFERENCES permissions(permission_id) 0,
    "usertype_title" VARCHAR(20) NOT NULL "NO ACCESS",
    "created_at" TIMESTAMPTZ DEFAULT NOW()
)