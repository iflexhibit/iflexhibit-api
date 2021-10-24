const { pool } = require("../configs/database");
const { encrypt, decrypt } = require("../utils/encrypt");

const QUERIES = {
  fetchPosts: `SELECT
  posts.post_id,
  poststatus.status_title,
  users.username,
  users.avatar_image,
  posts.post_title,
  posts.post_image,
  posts.post_tags,
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
      FILTER (WHERE posts.post_id=comments.post_id AND comments.is_disabled=FALSE AND comments.is_deleted=FALSE)
      FROM comments
  ) AS comments_count,
  posts.created_at
  FROM posts
  JOIN poststatus ON posts.status_id=poststatus.status_id
  JOIN users ON posts.user_id=users.user_id
  WHERE posts.status_id=2 AND posts.is_deleted=FALSE
  ;`,
};

function fetchPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.fetchPosts, []);

      if (!rows[0] || rows.length === 0) return resolve(null);

      const posts = rows.map((post) => ({
        id: post.post_id,
        status: post.status_title,
        author: { username: decrypt(post.username), avatar: post.avatar_image },
        title: post.post_title,
        image: post.post_image,
        tags: post.post_tags.split(","),
        statistics: {
          views: post.views_count,
          likes: post.likes_count,
          comments: post.comments_count,
        },
        createdAt: post.created_at,
      }));

      return resolve({ posts, count: rowCount });
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = { fetchPosts };
