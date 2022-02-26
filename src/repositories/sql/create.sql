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
    "usertype_id" CHAR(3) NOT NULL REFERENCES usertypes(usertype_id) DEFAULT 'ut1',
    "username" TEXT NOT NULL UNIQUE,
    "given_name" TEXT DEFAULT NULL,
    "family_name" TEXT DEFAULT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "contact" TEXT DEFAULT NULL,
    "avatar_image" TEXT DEFAULT NULL,
    "background_image" TEXT DEFAULT NULL,
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

-- check userpost
CREATE OR REPLACE RULE check_userpost AS 
	ON INSERT TO userpost
	WHERE 
		EXISTS ( 
			SELECT 
				userpost.post_id,
				userpost.user_id
			FROM 
				userpost
			WHERE
				userpost.post_id = new.post_id AND userpost.user_id = new.user_id
		)
	DO INSTEAD NOTHING;

-- count like

CREATE OR REPLACE RULE count_likes AS
	ON UPDATE TO userpost
	DO ALSO UPDATE posts SET likes_count = 
			(SELECT COUNT (*)
			FROM userpost
			WHERE is_liked AND userpost.post_id = new.post_id) + 1
	WHERE posts.post_id = new.post_id;

-- count view

CREATE OR REPLACE RULE count_views AS 
	ON INSERT TO userpost
	DO ALSO
		UPDATE posts SET views_count = (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id = userpost.post_id)
        FROM userpost)
		WHERE new.post_id = posts.post_id;

-- count comments

CREATE OR REPLACE RULE count_comments AS
	ON INSERT TO comments
	DO ALSO
		UPDATE posts SET comments_count = (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id = comments.post_id AND comments.is_disabled = FALSE AND comments.is_deleted = FALSE)
        FROM comments)
		WHERE new.post_id = posts.post_id;

-- update usertypes
CREATE OR REPLACE RULE update_usertype_to_ban AS
    ON INSERT TO bans  
    DO ALSO
        UPDATE users SET usertype_id = 'ut4'
        WHERE users.user_id = new.target_id;

-- Create View
-- total rows
CREATE VIEW total_rows AS 
    SELECT
    (
        (SELECT COUNT(*) FROM bans) +
        (SELECT COUNT(*) FROM comments) +
        (SELECT COUNT(*) FROM offenses) +
        (SELECT COUNT(*) FROM permissions) +
        (SELECT COUNT(*) FROM posts) +
        (SELECT COUNT(*) FROM poststatus) +
        (SELECT COUNT(*) FROM reports) +
        (SELECT COUNT(*) FROM session) +
        (SELECT COUNT(*) FROM userpost) +
        (SELECT COUNT(*) FROM users) +
        (SELECT COUNT(*) FROM usertypes)
    ) as total_rows;

-- general_overview
CREATE VIEW general_overview AS
    SELECT 
        (SELECT COUNT (DISTINCT target_user_id) FROM reports WHERE reports.offense_id LIKE 'U%' AND is_deleted=FALSE) AS reported_users,
        (SELECT COUNT (DISTINCT target_post_id) FROM reports WHERE reports.offense_id LIKE 'P%' AND is_deleted=FALSE) AS reported_posts,
        (SELECT COUNT (DISTINCT target_comment_id) FROM reports WHERE reports.offense_id LIKE 'C%' AND is_deleted=FALSE) AS reported_comments,
        (SELECT COUNT (target_id) FROM bans WHERE bans.expires_at > now()) AS banned_users,
        (SELECT COUNT (post_id) FROM posts WHERE posts.status_id = 'ps1') AS pending_posts,
        (SELECT COUNT (post_id) FROM posts WHERE posts.status_id = 'ps4') AS disabled_posts,
        (SELECT COUNT (comment_id) FROM comments WHERE is_disabled = TRUE) AS disabled_comments,
        (SELECT now()) AS issued_at;

-- pending_posts
CREATE VIEW pending_posts AS
    SELECT 
        posts.post_id,
        posts.user_id,
        users.username,
        posts.post_title,
        posts.post_body,
        posts.post_image,
        posts.post_video,
        posts.created_at
    FROM posts
    INNER JOIN users ON users.user_id = posts.user_id
    WHERE posts.status_id = 'ps1'
    ORDER BY 
        created_at ASC;

-- reported_posts
CREATE VIEW reported_posts AS
    SELECT 
        reports.report_id,
        reports.target_post_id,
        posts.post_title,
        reports.target_user_id,
        (SELECT username FROM users WHERE users.user_id = posts.user_id) AS target_username,
        reports.user_id,
        (SELECT username FROM users WHERE users.user_id = reports.user_id) AS complainee_username,
        reports.offense_id,
        offenses.offense_title,
        offenses.ban_time,
        reports.report_note,
        reports.created_at
    FROM reports
    JOIN posts ON reports.target_post_id = posts.post_id
    JOIN offenses ON reports.offense_id = offenses.offense_id
    WHERE offenses.offense_type = 'p' AND reports.is_deleted = FALSE
    ORDER BY reports.created_at ASC;
    
-- reported_users
CREATE VIEW reported_users AS
    SELECT 
        reports.report_id,
        reports.target_user_id,
        (SELECT username FROM users WHERE users.user_id = reports.target_user_id) AS target_username,
        reports.user_id,
        (SELECT username FROM users WHERE users.user_id = reports.user_id) AS complainee_username,
        reports.offense_id,
        offenses.offense_title,
        offenses.ban_time,
        reports.report_note,
        reports.created_at
    FROM reports
    JOIN offenses ON offenses.offense_id = reports.offense_id
    WHERE offenses.offense_type = 'u' AND reports.is_deleted = FALSE
    ORDER BY reports.created_at ASC;


-- banned_users
CREATE VIEW banned_users AS 
    SELECT 
        bans.ban_id,
        bans.target_id,
        (SELECT username FROM users WHERE users.user_id = bans.target_id) AS banned_user,
        bans.user_id,
        (SELECT username FROM users WHERE users.user_id = bans.user_id) AS complainee_username,
        bans.offense_id,
        offenses.offense_title,
        bans.ban_note,
        bans.created_at,
        bans.expires_at
    FROM bans
    JOIN offenses ON offenses.offense_id = bans.offense_id
    ORDER BY complainee_username ASC;

-- reported_comments 
CREATE VIEW reported_comments AS
    SELECT 
        reports.report_id,
        reports.target_comment_id,
        comments.comment_body,
        reports.target_user_id,
        (SELECT username FROM users WHERE users.user_id = reports.target_user_id) AS target_username,
        reports.target_post_id,
        reports.user_id,
        (SELECT username FROM users WHERE users.user_id = reports.user_id) AS complainee_username,
        reports.offense_id,
        offenses.offense_title,
        offenses.ban_time,
        reports.report_note,
        reports.created_at
    FROM reports
    JOIN comments ON comments.comment_id = reports.target_comment_id
    JOIN offenses ON offenses.offense_id = reports.offense_id
    WHERE offenses.offense_type = 'c' AND reports.is_deleted = FALSE
    ORDER BY reports.created_at ASC;

-- disabled_comments
CREATE VIEW disabled_comments AS
    SELECT
        comments.comment_id,
        comments.comment_body,
        comments.user_id,
        users.username,
        comments.post_id,
        comments.created_at
    FROM comments
    JOIN users ON users.user_id = comments.user_id
    WHERE is_disabled = TRUE
    ORDER BY comments.comment_id ASC;
-- disabled_posts

CREATE VIEW disabled_posts AS
    SELECT
        posts.post_id,
        posts.post_title,
        posts.user_id,
        users.username,
        posts.post_body,
        posts.post_image,
        posts.post_video,
        posts.created_at
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    WHERE posts.status_id = 'ps4'
    ORDER BY posts.post_id ASC;
