const express = require("express");
const auth = require("../../middlware/auth");
const { fetchUserPosts } = require("../../repositories/PostRepository");
const {
  insertComment,
  fetchProfile,
  updatePreferences,
  updateProfile,
} = require("../../repositories/UserRepository");
const router = express.Router();

router.get("/user", auth, async (req, res) => {
  return res.status(200).json({ status: 200, user: req.user });
});

router.get("/user/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ status: 400, msg: "Bad request" });

  const { sort, page } = req.query;
  try {
    const user = await fetchProfile(req.params.id);
    if (!user) return res.status(404).json({ status: 404, msg: "Not found" });
    const { posts, count } = await fetchUserPosts(user.id, sort, page);
    return res.status(200).json({ status: 200, user, results: count, posts });
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

router.post("/preferences", auth, async (req, res) => {
  const { showName, showContact, showEmail } = req.body;

  if (
    showName === null ||
    showName === undefined ||
    showContact === null ||
    showContact === undefined ||
    showEmail === null ||
    showEmail === undefined
  )
    return res.status(400).json({ status: 400, msg: "Bad request" });

  const newPreferences = {
    showName: showName === null || showName === undefined ? false : showName,
    showContact:
      showContact === null || showContact === undefined ? false : showContact,
    showEmail:
      showEmail === null || showEmail === undefined ? false : showEmail,
  };
  try {
    await updatePreferences(
      req.user.id,
      newPreferences.showName,
      newPreferences.showContact,
      newPreferences.showEmail
    );
    return res
      .status(200)
      .json({ status: 200, msg: "Preferences updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.post("/profile", auth, async (req, res) => {
  const { username, contact, bio } = req.body;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const contactRegex = /^(09|\+639)\d{9}$/;

  if (
    (!username && !contact && !bio) ||
    (username === req.user.username &&
      contact === req.user.contact &&
      bio === req.user.bio)
  ) {
    return res.status(400).json({ status: 400, msg: "Nothing changed" });
  }

  if (username.length < 4 || username.length > 30)
    return res
      .status(400)
      .json({ status: 400, msg: "Username must contain 4–30 characters" });

  if (username && !usernameRegex.test(username))
    return res.status(400).json({
      status: 400,
      msg: "Username must contain only alphanumeric characters",
    });

  if (contact && !contactRegex.test(contact))
    return res.status(400).json({ status: 400, msg: "Invalid contact number" });

  const newProfile = {
    username: username || req.user.username,
    contact: contact ?? req.user.contact,
    bio: bio ?? req.user.bio,
  };

  try {
    const user = await updateProfile(
      req.user.id,
      newProfile.username,
      newProfile.contact,
      newProfile.bio
    );

    return res
      .status(200)
      .json({ status: 200, user, msg: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

module.exports = router;
