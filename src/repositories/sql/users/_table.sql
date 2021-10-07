CREATE TABLE users (
    "user_id" SERIAL PRIMARY KEY UNIQUE,
    "usertype_id" INT NOT NULL FOREIGN KEY REFERENCES userTypes(usertype_id),
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
)