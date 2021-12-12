-- add like

CREATE RULE add_like AS
	ON INSERT TO userpost
	DO ALSO
		UPDATE posts SET likes_count = likes_count +
			CASE
				WHEN new.is_liked = TRUE THEN 1
				ELSE 0
			END
		WHERE new.post_id = posts.post_id;

-- add view

CREATE RULE add_view AS 
	ON INSERT TO userpost
	DO ALSO
		UPDATE posts SET views_count = views_count + 1
		WHERE new.post_id = posts.post_id;

--add comments

CREATE RULE add_comments AS
	ON INSERT TO comments
	DO ALSO
		UPDATE posts SET comments_count = comments_count + 1
		WHERE new.post_id = posts.post_id;