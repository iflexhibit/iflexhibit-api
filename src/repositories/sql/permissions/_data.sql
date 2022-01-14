-- guest permissions
INSERT INTO permissions (permission_id, submit_post, comment_post, moderator_access, admin_access)
VALUES ('gue', FALSE, FALSE, FALSE, FALSE);
-- member permissions
INSERT INTO permissions(permission_id, submit_post, comment_post, moderator_access, admin_access)
VALUES ('mem', TRUE, TRUE, FALSE, FALSE);
-- moderator
INSERT INTO permissions(permission_id, submit_post, comment_post, moderator_access, admin_access)
VALUES ('mod', TRUE, TRUE, TRUE, FALSE);
-- administrator
INSERT INTO permissions(permission_id, submit_post, comment_post, moderator_access, admin_access)
VALUES ('adm', TRUE, TRUE, TRUE, TRUE);
-- banned 
INSERT INTO permissions(permission_id, submit_post, comment_post, moderator_access, admin_access)
VALUES ('ban', FALSE, FALSE, FALSE, FALSE);