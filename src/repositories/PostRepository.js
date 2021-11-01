const { query } = require("express");
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
  fetchPost: `SELECT 
  posts.post_id,
  poststatus.status_title,
  users.username,
  posts.post_title,
  posts.post_image,
  posts.post_tags,
  posts.post_body,
  users.avatar_image,
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
  WHERE posts.status_id=2 AND posts.is_deleted=FALSE AND post_id=$1;`,
  fetchComments: `SELECT 
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
  WHERE comments.post_id=$1;
  `,
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

function fetchPost(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.fetchPost, [id]);

      if (!rows[0]) return resolve(null);

      const post = {
        id: rows[0].post_id,
        status: rows[0].status_title,
        author: {
          username: decrypt(rows[0].username),
          avatar: rows[0].avatar_image,
        },
        title: rows[0].post_title,
        image: rows[0].post_image,
        tags: rows[0].post_tags.split(","),
        body: rows[0].post_body,
        statistics: {
          views: rows[0].views_count,
          likes: rows[0].likes_count,
          comments: rows[0].comments_count,
        },
        createdAt: rows[0].created_at,
      };

      return resolve(post);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
}

function fetchComments(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(QUERIES.fetchComments, [
        postId,
      ]);
      if (!rows) return resolve(null);
      const comments = rows.map((comment) => ({
        id: comment.comment_id,
        author: {
          id: comment.user_id,
          username: decrypt(comment.username),
          avatar: comment.avatar_image,
        },
        body: comment.comment_body,
        isDisabled: comment.is_disabled,
        createdAt: comment.created_at,
      }));
      return resolve({ comments, count: rowCount });
    } catch (error) {
      return reject(error);
    }
  });
}
module.exports = { fetchPosts, fetchPost, fetchComments };
