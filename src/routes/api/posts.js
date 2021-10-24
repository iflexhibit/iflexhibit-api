const express = require("express");
const { fetchPosts, fetchPost } = require("../../repositories/PostRepository");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { posts, count } = await fetchPosts();
    return res.status(200).json({ status: 200, results: count, posts });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await fetchPost(req.params.id);
    if (!post) return res.status(404).json({ status: 404, msg: "Not found" });
    return res.status(200).json({ status: 200, post });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

module.exports = router;
