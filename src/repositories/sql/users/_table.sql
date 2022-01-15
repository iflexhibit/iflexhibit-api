CREATE TABLE users (
    "user_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "usertype_id" CHAR(3) NOT NULL REFERENCES usertypes(usertype_id) DEFAULT 'ut0',
    "username" TEXT NOT NULL UNIQUE,
    "given_name" TEXT DEFAULT NULL,
    "family_name" TEXT DEFAULT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "contact" TEXT DEFAULT NULL,
    "avatar_image" TEXT DEFAULT '/assets/noavatar.jpg',
    "background_image" TEXT DEFAULT '/assets/nobg.jpg',
    "bio" TEXT DEFAULT NULL,
    "show_name" BOOLEAN DEFAULT FALSE,
    "show_email" BOOLEAN DEFAULT FALSE,
    "show_contact" BOOLEAN DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);