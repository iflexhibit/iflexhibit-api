-- member permissions
INSERT INTO permissions(submit_post, comment_post, moderator_access, admin_access)
VALUES (TRUE, TRUE, FALSE, FALSE);
-- moderator
INSERT INTO permissions(submit_post, comment_post, moderator_access, admin_access)
VALUES (TRUE, TRUE, TRUE, FALSE);