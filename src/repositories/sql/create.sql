-- Session

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


-- Offenses

CREATE TABLE offenses (
    "offense_id" CHAR(3) NOT NULL PRIMARY KEY,
    "offense_title" VARCHAR(50) NOT NULL,
    "offense_type" CHAR(1) NOT NULL DEFAULT 'u',
    "ban_time" CHAR(2) NOT NULL DEFAULT 00,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Poststatus

CREATE TABLE poststatus (
    "status_id" CHAR(3) NOT NULL PRIMARY KEY,
    "status_title" VARCHAR(10) NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Permissions

CREATE TABLE permissions (
    "permission_id" CHAR(3) PRIMARY KEY,
    "submit_post" BOOLEAN NOT NULL DEFAULT FALSE,
    "comment_post" BOOLEAN NOT NULL DEFAULT FALSE,
    "moderator_access" BOOLEAN NOT NULL DEFAULT FALSE,
    "admin_access" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Usertypes

CREATE TABLE usertypes (
    "usertype_id" CHAR(3) NOT NULL PRIMARY KEY,
    "permission_id" CHAR(3) NOT NULL REFERENCES permissions(permission_id) DEFAULT 'gue',
    "usertype_title" VARCHAR(20) NOT NULL DEFAULT 'NO ACCESS',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Users

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

-- Posts

CREATE TABLE posts (
    "post_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "status_id" CHAR(3) NOT NULL REFERENCES poststatus(status_id) DEFAULT 'ps1',
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "post_title" VARCHAR(100) NOT NULL,
    "post_body" TEXT DEFAULT NULL,
    "post_image" TEXT NOT NULL,
    "post_video" TEXT DEFAULT NULL,
    "post_tags" TEXT DEFAULT NULL,
    "likes_count" INT DEFAULT 0,
    "comments_count" INT DEFAULT 0,
    "views_count" INT DEFAULT 0,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Comments

CREATE TABLE comments (
    "comment_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "post_id" INT NOT NULL REFERENCES posts(post_id),
    "comment_body" TEXT NOT NULL,
    "is_disabled" BOOLEAN NOT NULL DEFAULT FALSE,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Userpost

CREATE TABLE userpost (
    "userpost_id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "post_id" INT NOT NULL REFERENCES posts(post_id),
    "is_liked" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Reports

CREATE TABLE reports (
    "report_id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "target_user_id" INT NOT NULL REFERENCES users(user_id),
    "target_post_id" INT DEFAULT NULL REFERENCES posts(post_id) NULL,
    "target_comment_id" INT DEFAULT NULL REFERENCES comments(comment_id) NULL,
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "offense_id" CHAR(3) NOT NULL REFERENCES offenses(offense_id),
    "report_note" TEXT DEFAULT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Bans

CREATE TABLE bans(
    "ban_id" SMALLSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "report_id" INT NOT NULL REFERENCES reports(report_id),
    "target_id" INT NOT NULL REFERENCES users(user_id),
    "user_id" INT NOT NULL REFERENCES users(user_id),
    "offense_id" CHAR(3) NOT NULL REFERENCES offenses(offense_id),
    "ban_note" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Rules

-- add like

CREATE OR REPLACE RULE add_like AS
	ON UPDATE TO userpost
	DO ALSO
		UPDATE posts SET likes_count = 
			CASE
				WHEN new.is_liked = TRUE THEN 
					(SELECT COUNT(*)
        				FILTER (WHERE userpost.is_liked AND posts.post_id=userpost.post_id)
        				FROM userpost) + 1
				ELSE (SELECT COUNT(*)
        				FILTER (WHERE userpost.is_liked AND posts.post_id=userpost.post_id)
        				FROM userpost)
			END
		WHERE new.post_id = posts.post_id;

-- add view

CREATE OR REPLACE RULE add_view AS 
	ON INSERT TO userpost
	DO ALSO
		UPDATE posts SET views_count = (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id = userpost.post_id)
        FROM userpost)
		WHERE new.post_id = posts.post_id;

--add comments

CREATE OR REPLACE RULE add_comments AS
	ON INSERT TO comments
	DO ALSO
		UPDATE posts SET comments_count = (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id = comments.post_id AND comments.is_disabled = FALSE AND comments.is_deleted = FALSE)
        FROM comments)
		WHERE new.post_id = posts.post_id;