-- Rules
-- add like
DROP RULE IF EXISTS count_likes ON userpost;
-- add view
DROP RULE IF EXISTS count_views ON userpost;
-- add comments
DROP RULE IF EXISTS count_comments ON comments;
-- Bans
DROP TABLE bans;
-- Reports
DROP TABLE reports;
-- Userpost
DROP TABLE userpost;
-- Comments
DROP TABLE comments;
-- Posts
DROP TABLE posts;
-- Users
DROP TABLE users;
-- Usertypes
DROP TABLE usertypes;
-- Permissions
DROP TABLE permissions;
-- Poststatus
DROP TABLE poststatus;
-- Offenses
DROP TABLE offenses;
-- Session
DROP TABLE session;
