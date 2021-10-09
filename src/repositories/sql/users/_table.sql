CREATE TABLE users (
    "user_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "usertype_id" SMALLINT NOT NULL REFERENCES usertypes(usertype_id) DEFAULT 0,
    "username" TEXT NOT NULL UNIQUE,
    "given_name" TEXT DEFAULT NULL,
    "family_name" TEXT DEFAULT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "contact" TEXT DEFAULT NULL,
    "avatar_image" TEXT DEFAULT 'https://iflexhibit.com/assets/noavatar.jpg',
    "background_image" TEXT DEFAULT 'https://iflexhibit.com/assets/nobg.jpg',
    "show_name" BOOLEAN DEFAULT FALSE,
    "show_email" BOOLEAN DEFAULT FALSE,
    "show_contact" BOOLEAN DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);