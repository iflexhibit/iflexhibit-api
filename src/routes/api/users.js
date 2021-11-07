const express = require("express");
const auth = require("../../middlware/auth");
const {
  insertComment,
  fetchProfile,
} = require("../../repositories/UserRepository");
const router = express.Router();

router.get("/user", auth, async (req, res) => {
  return res.status(200).json({ status: 200, user: req.user });
});

router.get("/user/:id", auth, async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ status: 400, msg: "Bad request" });
  try {
    const user = await fetchProfile(req.params.id);
    if (!user) return res.status(404).json({ status: 404, msg: "Not found" });
    return res.status(200).json({ status: 200, user });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.post("/comment", auth, async (req, res) => {
  const { postId, commentBody } = req.body;
  if (!postId)
    return res.status(400).json({ status: 400, msg: "Invalid post" });
  if (!commentBody)
    return res.status(400).json({ status: 400, msg: "Invalid comment" });

  try {
    const comment = await insertComment(req.user.id, postId, commentBody);
    return res.status(201).json({ status: 201, comment });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

module.exports = router;
