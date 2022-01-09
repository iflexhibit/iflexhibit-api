-- add like

CREATE RULE add_like AS
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

CREATE RULE add_view AS 
	ON INSERT TO userpost
	DO ALSO
		UPDATE posts SET views_count = (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id=userpost.post_id)
        FROM userpost 
    	) + 1
		WHERE new.post_id = posts.post_id;

--add comments

CREATE RULE add_comments AS
	ON INSERT TO comments
	DO ALSO
		UPDATE posts SET comments_count = (
        SELECT COUNT(*)
        FILTER (WHERE posts.post_id=comments.post_id AND comments.is_disabled=FALSE AND comments.is_deleted=FALSE)
        FROM comments
    	) + 1
		WHERE new.post_id = posts.post_id;