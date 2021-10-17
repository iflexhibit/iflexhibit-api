-- List of todo's
-- 1 disabled DONE
-- 1 pending DONE
-- 1 rejected DONE
-- 1 approved with is_deleted=TRUE DONE
-- 6 approved with is_deleted=FALSE (the only visible posts to guest)


INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (1, 1, 'post-sample-pending', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (4, 1, 'post-sample-disabled', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (3, 1, 'post-sample-rejected', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 1, 'post-sample-approved-is deleted', 'This post is aimed to populate the table with variuos data.', 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', TRUE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 1, 'Mustang Concept #1', 'Ford is one of the dominant car manufacturers. One of their creations is this beauty.', 'https://images.unsplash.com/photo-1634066640783-c231155c4ded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 1, 'Through the lens', 'A lens can be a powerful tool in bringing light to the truth or a tool to manipulate people.', 'https://images.unsplash.com/photo-1559175996-cf73e18d10dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 1, 'Palm trees uphigh', 'This is my 1st color correction project. Hope you like it!', 'https://images.unsplash.com/photo-1634324320612-5a43eb32fc07?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 1, 'Nightlife in Osaka', 'Really missed this place.', 'https://images.unsplash.com/photo-1634351440426-020152a2a495?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 1, 'Putting faith to the test', 'In these trying times, our faith is being tested and challenged. Let us remain faithful for His plans are greater than ours.', 'https://images.unsplash.com/photo-1634314063731-e504a9245d1f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTN8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);

INSERT INTO posts (status_id, user_id, post_title, post_body, post_image, post_video, post_tags, is_deleted)
VALUES (2, 1, 'Mafia automobile', 'Just finished playing Mafia Definitive Edition. I am placing this here for my mood board. This car gives the old classic vibe and finesse.', 'https://images.unsplash.com/photo-1634133117074-ce0333fb7891?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMTR8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', NULL, 'Photography,Portrait', FALSE);