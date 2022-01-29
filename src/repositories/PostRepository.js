const { pool } = require("../configs/database");
const { decrypt } = require("../utils/encrypt");
const PostQueries = require("./PostQueries");

function fetchApprovedPosts(title = "%", tags = "%", sort = "date", page = 1) {
  const paramsA = {
    title: `.*${title.length > 0 ? title : "%"}*.`,
    tags: `%${tags.split(",").sort().join("%")}%`,
    sort,
    page: isNaN(parseInt(page)) ? 1 : parseInt(page),
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(
        PostQueries.fetchApprovedPosts,
        [...Object.values(paramsA)]
      );
      if (!rows[0] || rows.length === 0)
        return resolve({ posts: null, count: 0 });

      const posts = rows.map((post) => ({
        id: post.post_id,
        status: post.status_title,
        author: {
          id: post.user_id,
          username: decrypt(post.username),
          avatar: decrypt(post.avatar_image),
        },
        title: post.post_title,
        image: post.post_image,
        tags: post.post_tags.split(","),
        statistics: {
          views: parseInt(post.views_count),
          likes: parseInt(post.likes_count),
          comments: parseInt(post.comments_count),
        },
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      }));

      const paramsB = {
        title: paramsA.title,
        tags: paramsA.tags,
      };

      const count = await pool.query(PostQueries.fetchApprovedPostsCount, [
        ...Object.values(paramsB),
      ]);

      return resolve({
        posts,
        count: isNaN(parseInt(count.rows[0].posts_count))
          ? 0
          : parseInt(count.rows[0].posts_count),
      });
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
}

function fetchApprovedPost(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(
        PostQueries.fetchApprovedPost,
        [postId]
      );

      if (!rows[0]) return resolve(null);

      const post = {
        id: rows[0].post_id,
        status: rows[0].status_title,
        author: {
          id: rows[0].user_id,
          username: decrypt(rows[0].username),
          avatar: decrypt(rows[0].avatar_image),
          givenName: decrypt(rows[0].given_name),
          familyName: decrypt(rows[0].family_name),
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
        updatedAt: rows[0].updated_at,
      };

      return resolve(post);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
}

function fetchUserPosts(userId, sort = "date", page = 1) {
  const params = {
    sort,
    page: isNaN(parseInt(page)) ? 1 : parseInt(page),
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(PostQueries.fetchUserPosts, [
        userId,
        params.sort,
        params.page,
      ]);

      if (!rows[0] || rows.length === 0)
        return resolve({ posts: null, count: 0 });

      const posts = rows.map((post) => ({
        id: post.post_id,
        author: {
          id: post.user_id,
          username: decrypt(post.username),
          avatar: decrypt(post.avatar_image),
        },
        title: post.post_title,
        image: post.post_image,
        tags: post.post_tags.split(","),
        statistics: {
          views: parseInt(post.views_count),
          likes: parseInt(post.likes_count),
          comments: parseInt(post.comments_count),
        },
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      }));

      const count = await pool.query(PostQueries.fetchUserPostsCount, [userId]);

      return resolve({
        posts,
        count: isNaN(parseInt(count.rows[0].posts_count))
          ? 0
          : parseInt(count.rows[0].posts_count),
      });
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
}

function fetchPostComments(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows, rowCount } = await pool.query(
        PostQueries.fetchPostComments,
        [postId]
      );
      if (!rows) return resolve(null);
      const comments = rows.map((comment) => ({
        id: comment.comment_id,
        author: {
          id: comment.user_id,
          username: decrypt(comment.username),
          avatar: decrypt(comment.avatar_image),
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

function insertPost(
  userId,
  postTitle,
  postBody,
  postImage,
  postVideo,
  postTags
) {
  return new Promise(async (resolve, reject) => {
    const newPost = {
      userId,
      postTitle,
      postBody,
      postImage,
      postVideo,
      postTags,
    };
    try {
      const { rows, rowCount } = await pool.query(PostQueries.insertPost, [
        ...Object.values(newPost),
      ]);
      if (!rows[0]) return resolve(null);
      const post = { id: rows[0].post_id };
      return resolve(post);
    } catch (error) {
      return reject(error);
    }
  });
}

function viewPost(userId, postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(PostQueries.viewPost, [userId, postId]);
      return resolve(true);
    } catch (error) {
      return reject(error);
    }
  });
}

function likePost(userId, postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(PostQueries.likePost, [userId, postId]);
      return resolve(true);
    } catch (error) {
      return reject(error);
    }
  });
}

function fetchUserPostInteraction(userId, postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(PostQueries.fetchUserPostInteraction, [
        userId,
        postId,
      ]);
      if (!rows[0]) return resolve(null);
      return resolve(rows[0].is_liked);
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  fetchApprovedPosts,
  fetchApprovedPost,
  fetchPostComments,
  fetchUserPosts,
  insertPost,
  viewPost,
  likePost,
  fetchUserPostInteraction,
};
