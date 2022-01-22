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
-- Status: In Progress
-- Findings: Working (1-22-22)

-- SELECT * FROM userpost
-- WHERE user_id IN (x) AND post_id in (X);

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