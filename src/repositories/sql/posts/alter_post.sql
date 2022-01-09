ALTER TABLE posts
ADD COLUMN likes_count INT DEFAULT 0,
ADD COLUMN comments_count INT DEFAULT 0,
ADD COLUMN views_count INT DEFAULT 0;

-- This command adds a likes, comments, and views counter per post.