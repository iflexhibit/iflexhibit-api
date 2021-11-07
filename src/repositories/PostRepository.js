const { query } = require("express");
const { pool } = require("../configs/database");
const { encrypt, decrypt } = require("../utils/encrypt");
const PostQueries = require("./PostQueries");

function fetchPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(PostQueries.fetchPosts, []);

      if (!rows[0] || rows.length === 0) return resolve(null);

      const posts = rows.map((post) => ({
        id: post.post_id,
        status: post.status_title,
        author: { username: decrypt(post.username), avatar: post.avatar_image },
        title: post.post_title,
        image: post.post_image,
        tags: post.post_tags.split(","),
        statistics: {
          views: parseInt(post.views_count),
          likes: parseInt(post.likes_count),
          comments: parseInt(post.comments_count),
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
      const { rows, rowCount } = await pool.query(PostQueries.fetchPost, [id]);

      if (!rows[0]) return resolve(null);

      const post = {
        id: rows[0].post_id,
        status: rows[0].status_title,
        author: {
          id: rows[0].user_id,
          username: decrypt(rows[0].username),
          avatar: rows[0].avatar_image,
          givenName: rows[0].given_name,
          familyName: rows[0].family_name,
        },
        title: rows[0].post_title,
        image: rows[0].post_image,
        tags: rows[0].post_tags.split(","),
        body: rows[0].post_body,
        statistics: {
          views: parseInt(rows[0].views_count),
          likes: parseInt(rows[0].likes_count),
          comments: parseInt(rows[0].comments_count),
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
      const { rows, rowCount } = await pool.query(PostQueries.fetchComments, [
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
