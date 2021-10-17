-- List of todo's
-- 1 disabled DONE
-- 1 pending DONE
-- 1 rejected DONE
-- 1 approved with is_deleted=TRUE DONE
-- 6 approved with is_deleted=FALSE (the only visible posts to guest)

-- pending
INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (1, 5, 'post-sample-pending', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

-- disabled
INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (4, 5, 'post-sample-disabled', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

-- rejected
INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (3, 5, 'post-sample-rejected', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

-- deleted
INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 5, 'post-sample-approved-is deleted', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', TRUE);

-- approved and visible to guest
INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 5, 'post-sample-approved', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 5, 'post-sample-approved', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 5, 'post-sample-approved', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 5, 'post-sample-approved', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 5, 'post-sample-approved', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 5, 'post-sample-approved', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);