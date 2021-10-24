const express = require("express");
const { fetchPosts } = require("../../repositories/PostRepository");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { posts, count } = await fetchPosts();
    return res.status(200).json({ status: 200, results: count, posts });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

module.exports = router;
