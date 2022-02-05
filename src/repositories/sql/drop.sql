-- View
-- general_overview
DROP VIEW IF EXISTS general_overview;
<<<<<<< HEAD
-- reported_posts
DROP VIEW IF EXISTS reported_posts;
=======
-- pending_posts
DROP VIEW IF EXISTS pending_posts;
-- reported_users
DROP VIEW IF EXISTS reported_users;
>>>>>>> main
-- Rules
-- add like
DROP RULE IF EXISTS count_likes ON userpost;
-- add view
DROP RULE IF EXISTS count_views ON userpost;
-- add comments
DROP RULE IF EXISTS count_comments ON comments;
-- check_userpost
DROP RULE IF EXISTS check_userpost ON userpost;
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
