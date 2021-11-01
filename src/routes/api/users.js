const express = require("express");
const auth = require("../../middlware/auth");
const { insertComment } = require("../../repositories/UserRepository");
const router = express.Router();

router.get("/user", auth, async (req, res) => {
  return res.status(200).json({ status: 200, user: req.user });
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
