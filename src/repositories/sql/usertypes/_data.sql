-- guests
INSERT INTO usertypes (usertype_id, permission_id, usertype_title)
VALUES ('ut0', 'gue', 'guest');
-- member
INSERT INTO usertypes (usertype_id, permission_id, usertype_title)
VALUES ('ut1', 'mem', 'member');
-- moderator
INSERT INTO usertypes (usertype_id, permission_id, usertype_title)
VALUES ('ut2', 'mod', 'moderator');
-- administrator
INSERT INTO usertypes (usertype_id, permission_id, usertype_title)
VALUES ('ut3', 'adm', 'administrator');
-- banned
INSERT INTO usertypes (usertype_id, permission_id, usertype_title)
VALUES ('ut4', 'ban', 'banned');