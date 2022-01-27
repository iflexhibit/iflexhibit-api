const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const auth = require("../../middlware/auth");
const { cloudinary } = require("../../configs/cloudinary");
const {
  fetchApprovedPosts,
  fetchApprovedPost,
  fetchPostComments,
  insertPost,
  viewPost,
  likePost,
  fetchUserPostInteraction,
} = require("../../repositories/PostRepository");
const router = express.Router();

router.get("/", async (req, res) => {
  const { title, tags, sort, page } = req.query;
  try {
    const { posts, count } = await fetchApprovedPosts(title, tags, sort, page);
    return res.status(200).json({ status: 200, results: count, posts });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await fetchApprovedPost(req.params.id);
    if (!post) return res.status(404).json({ status: 404, msg: "Not found" });
    return res.status(200).json({ status: 200, post });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const { comments, count } = await fetchPostComments(req.params.id);
    if (!comments)
      return res.status(404).json({ status: 404, msg: "Not found" });
    return res.status(200).json({ status: 200, results: count, comments });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.post("/", auth, async (req, res) => {
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

    if (!fields.title) {
      fs.unlinkSync(files.file.path);
      return res.status(400).json({ status: 400, msg: "Title required" });
    }

    try {
      const response = await cloudinary.uploader.upload(files.file.path, {
        folder: "iflexhibit/uploads",
        upload_preset: "iflexhibit",
        allowed_formats: ["png", "jpg"],
      });

      const post = await insertPost(
        req.user.id,
        fields.title,
        fields.description,
        response.url,
        null,
        fields.tags
      );

      return res.status(201).json({ status: 201, post });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, msg: "Something went wrong", error });
    } finally {
      fs.unlinkSync(files.file.path);
    }
  });
});

router.post("/view/:id", auth, async (req, res) => {
  if (!req.params.id || isNaN(parseInt(req.params.id)))
    return res.sendStatus(400);
  try {
    await viewPost(req.user.id, req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.post("/like/:id", auth, async (req, res) => {
  if (!req.params.id || isNaN(parseInt(req.params.id)))
    return res.sendStatus(400);
  try {
    await likePost(req.user.id, req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.post("/isliked/:id", auth, async (req, res) => {
  if (!req.params.id || isNaN(parseInt(req.params.id)))
    return res.sendStatus(400);
  try {
    const isLiked = await fetchUserPostInteraction(req.user.id, req.params.id);
    return res.status(200).json({ isLiked });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

module.exports = router;
