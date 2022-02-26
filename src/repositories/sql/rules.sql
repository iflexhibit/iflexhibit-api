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
	DO INSTEAD INSERT INTO userpost_view (post_id, user_id) values (new.post_id+1, new.user_id+1) RETURNING userpost_view.*

create view userpost_view as select * from userpost;

-- count like

CREATE OR REPLACE RULE count_likes AS
	ON UPDATE TO userpost
	DO ALSO
		UPDATE posts SET likes_count = 
			(SELECT COUNT(*)
			FILTER (WHERE userpost.is_liked AND posts.post_id=userpost.post_id)
			FROM userpost)
		WHERE new.post_id = posts.post_id;

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

-- reset_usertype

CREATE OR REPLACE RULE reset_usertype AS 
	ON DELETE TO bans
	DO
	UPDATE users 
	SET usertype_id = 'ut1'
	WHERE (
		SELECT bans.target_id 
		FROM bans 
		WHERE ban_id = old.ban_id) = users.user_id;