module.exports = {
  fetchApprovedPosts: `
    SELECT 
        posts.post_id,
        posts.status_id,
        poststatus.status_title,
        posts.user_id,
        users.username,
        users.avatar_image,
        posts.likes_count,
        posts.views_count,
        posts.comments_count,
        posts.post_title,
        posts.post_tags,
        posts.post_image,
        posts.created_at,
        posts.updated_at
    FROM posts
        JOIN users ON posts.user_id = users.user_id
        JOIN poststatus ON posts.status_id = poststatus.status_id
    WHERE posts.status_id = 'ps2' AND posts.is_deleted = FALSE
        AND posts.post_title ~* $1 AND posts.post_tags LIKE $2
    ORDER BY 
        CASE WHEN ($3 = 'likes') THEN likes_count END DESC,
        CASE WHEN ($3 = 'views') THEN views_count END DESC,
        CASE WHEN ($3 = 'comments') THEN comments_count END DESC,
        posts.updated_at DESC
    LIMIT 15
    OFFSET ($4 - 1) * 15;
  `,
  fetchApprovedPost: `
    SELECT 
        posts.post_id,
        poststatus.status_title,
        users.username,
        posts.post_title,
        posts.post_image,
        posts.post_tags,
        posts.post_body,
        users.avatar_image,
        users.user_id,
        CASE WHEN users.show_name = FALSE THEN NULL
            ELSE users.given_name
            END,
        CASE WHEN users.show_name = FALSE THEN NULL
            ELSE users.family_name
            END,
        (
            SELECT COUNT(*)
            FILTER (WHERE posts.post_id=userpost.post_id)
            FROM userpost 
        ) AS views_count,
        (
            SELECT COUNT(*)
            FILTER (WHERE userpost.is_liked AND posts.post_id=userpost.post_id)
            FROM userpost
        ) AS likes_count,
        (
            SELECT COUNT(*)
            FILTER (WHERE posts.post_id = comments.post_id AND comments.is_disabled = FALSE AND comments.is_deleted = FALSE)
            FROM comments
        ) AS comments_count,
        posts.created_at,
        posts.updated_at
    FROM posts
        JOIN poststatus ON posts.status_id = poststatus.status_id
        JOIN users ON posts.user_id = users.user_id
    WHERE posts.status_id = 'ps2' AND posts.is_deleted = FALSE AND post_id = $1;
  `,
  fetchUserPosts: `
    SELECT 
        posts.post_id,
        posts.user_id,
        users.username,
        users.avatar_image,
        likes_count,
        views_count,
        comments_count,
        posts.post_title,
        posts.post_tags,
        posts.post_image,
        posts.created_at,
        posts.updated_at
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    JOIN poststatus ON posts.status_id = poststatus.status_id
    WHERE posts.status_id = 'ps2' AND posts.is_deleted = FALSE AND posts.user_id = $1
    ORDER BY
        CASE WHEN ($2 = 'likes') THEN likes_count END DESC,
        CASE WHEN ($2 = 'views') THEN views_count END DESC,
        CASE WHEN ($2 = 'comments') THEN comments_count END DESC,
        posts.updated_at DESC
    LIMIT 15
    OFFSET ($3 - 1) * 15;
  `,
  fetchPostComments: `
    SELECT 
        comments.comment_id,
        users.user_id,
        users.username,
        users.avatar_image,
        CASE WHEN is_disabled=FALSE THEN comments.comment_body
            ELSE 'This comment has been disabled.'
            END AS comment_body,
        comments.is_disabled,
        comments.created_at
    FROM comments
        JOIN users ON comments.user_id=users.user_id
        JOIN posts ON comments.post_id=posts.post_id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at DESC;
`,
  insertPost: `
    INSERT INTO posts (user_id, post_title, post_body, post_image, post_video, post_tags)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING post_id;
`,
  fetchApprovedPostsCount: `
    SELECT 
        COUNT(*) AS posts_count
    FROM posts
        JOIN users ON posts.user_id = users.user_id
        JOIN poststatus ON posts.status_id = poststatus.status_id
    WHERE
        posts.status_id = 'ps2'
        AND posts.is_deleted = FALSE
        AND posts.post_title ~* $1
        AND posts.post_tags LIKE $2;
`,
  fetchUserPostsCount: `
    SELECT 
        COUNT(*) AS posts_count
    FROM posts
        JOIN users ON posts.user_id = users.user_id
        JOIN poststatus ON posts.status_id = poststatus.status_id
    WHERE posts.status_id = 'ps2' AND posts.is_deleted = FALSE AND posts.user_id = $1;
`,
  viewPost: `
    INSERT INTO userpost (user_id, post_id) VALUES ($1, $2);
`,
  likePost: `
    UPDATE userpost 
    SET is_liked = TRUE 
    WHERE userpost.user_id = $1 AND userpost.post_id = $2;
`,
  fetchUserPostInteraction: `
    SELECT * 
    FROM userpost 
    WHERE userpost.user_id = $1 AND userpost.post_id = $2;
`,
};
