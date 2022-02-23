const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const { cloudinary } = require("../../configs/cloudinary");
const auth = require("../../middlware/auth");
const PostRepository = require("../../repositories/PostRepository");
const UserRepository = require("../../repositories/UserRepository");
const router = express.Router();

router.get("/user", auth, async (req, res) => {
  return res.status(200).json({ status: 200, user: req.user });
});

router.get("/user/:search", async (req, res) => {
  const { sort, page, type } = req.query;
  let userId = req.params.search;
  try {
    if (type === "username")
      userId = await UserRepository.findByUsername(req.params.search);
    if (!userId) return res.status(404).json({ status: 404, msg: "Not found" });

    const user = await UserRepository.fetchProfile(userId);
    if (!user) return res.status(404).json({ status: 404, msg: "Not found" });

    const { posts, count } = await PostRepository.fetchUserPosts(
      user.id,
      sort,
      page
    );
    return res.status(200).json({ status: 200, user, results: count, posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.post("/posts", auth, async (req, res) => {
  const { sort, page } = req.query;
  try {
    const { posts, count } = await PostRepository.fetchMyPosts(
      req.user.id,
      sort,
      page
    );
    return res.status(200).json({ status: 200, results: count, posts });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.post("/comment", auth, async (req, res) => {
  if (!req.user.permissions.commentPost)
    return res
      .status(403)
      .json({ status: 403, msg: "You are currently banned" });
  const { postId, commentBody } = req.body;
  if (!postId)
    return res.status(400).json({ status: 400, msg: "Invalid post" });
  if (!commentBody)
    return res.status(400).json({ status: 400, msg: "Invalid comment" });
  if (!commentBody.trim().length > 0)
    return res.status(400).json({ status: 400, msg: "Invalid comment" });

  try {
    const comment = await UserRepository.insertComment(
      req.user.id,
      postId,
      commentBody
    );
    return res.status(201).json({ status: 201, comment });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.delete("/comment/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(parseInt(id)))
    return res.status(400).json({ status: 400, msg: "Invalid comment id" });

  try {
    const result = await UserRepository.deleteComment(id, req.user.id);
    if (result)
      return res
        .status(200)
        .json({ status: 200, msg: "Comment successfully deleted" });
    return res
      .status(400)
      .json({ status: 400, msg: "Unable to delete comment at this moment" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
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
    await UserRepository.updatePreferences(
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

  if (
    contact &&
    (contact.length < 8 ||
      contact.length > 12 ||
      isNaN(parseInt(contact.length)))
  )
    return res.status(400).json({ status: 400, msg: "Invalid contact number" });

  const newProfile = {
    username: username || req.user.username,
    contact: contact ?? req.user.contact,
    bio: bio ?? req.user.bio,
  };

  try {
    const user = await UserRepository.updateProfile(
      req.user.id,
      newProfile.username,
      newProfile.contact,
      newProfile.bio
    );

    return res
      .status(200)
      .json({ status: 200, user, msg: "Profile updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Username already exists" });
  }
});

router.post("/avatar", auth, async (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: "temp",
  });
  form.parse(req, async (err, fields, files) => {
    if (err)
      return res
        .status(500)
        .json({ status: 500, msg: "Something went wrong", error: err });

    if (Object.keys(files).length === 0)
      return res.status(400).json({ status: 400, msg: "Image required" });

    if (!["image/jpeg", "image/png"].includes(files.file.type)) {
      fs.unlinkSync(files.file.path);
      return res.status(400).json({ status: 400, msg: "Invalid file type" });
    }

    try {
      const response = await cloudinary.uploader.upload(files.file.path, {
        folder: "iflexhibit/uploads",
        upload_preset: "iflexhibit",
        allowed_formats: ["png", "jpg"],
      });

      const result = await UserRepository.updateAvatar(
        req.user.id,
        response.url
      );

      if (result) {
        if (req.user.avatar) {
          const publicId = `iflexhibit/uploads/${
            req.user.avatar.split("iflexhibit/uploads/")[1].split(".")[0]
          }`;
          cloudinary.uploader.destroy(publicId);
        }
        return res
          .status(200)
          .json({ status: 200, msg: "Avatar successfully updated" });
      }
      return res.status(200).json({ status: 200, msg: "Nothing changed" });
    } catch (error) {
      return res.status(500).json({ status: 500, msg: "Something went wrong" });
    } finally {
      fs.unlinkSync(files.file.path);
    }
  });
});

router.post("/background", auth, async (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: "temp",
  });
  form.parse(req, async (err, fields, files) => {
    if (err)
      return res
        .status(500)
        .json({ status: 500, msg: "Something went wrong", error: err });

    if (Object.keys(files).length === 0)
      return res.status(400).json({ status: 400, msg: "Image required" });

    if (!["image/jpeg", "image/png"].includes(files.file.type)) {
      fs.unlinkSync(files.file.path);
      return res.status(400).json({ status: 400, msg: "Invalid file type" });
    }

    try {
      const response = await cloudinary.uploader.upload(files.file.path, {
        folder: "iflexhibit/uploads",
        upload_preset: "iflexhibit",
        allowed_formats: ["png", "jpg"],
      });

      const result = await UserRepository.updateBackground(
        req.user.id,
        response.url
      );

      if (result) {
        if (req.user.background) {
          const publicId = `iflexhibit/uploads/${
            req.user.background.split("iflexhibit/uploads/")[1].split(".")[0]
          }`;
          cloudinary.uploader.destroy(publicId);
        }
        return res
          .status(200)
          .json({ status: 200, msg: "Background successfully updated" });
      }
      return res.status(200).json({ status: 200, msg: "Nothing changed" });
    } catch (error) {
      return res.status(500).json({ status: 500, msg: "Something went wrong" });
    } finally {
      fs.unlinkSync(files.file.path);
    }
  });
});

module.exports = router;
