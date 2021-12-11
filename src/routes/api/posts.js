const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const auth = require("../../middlware/auth");
const { cloudinary } = require("../../configs/cloudinary");
const {
  fetchPosts,
  fetchPost,
  fetchComments,
  insertPost,
} = require("../../repositories/PostRepository");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { posts, count } = await fetchPosts();
    return res.status(200).json({ status: 200, results: count, posts });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await fetchPost(req.params.id);
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
    const { comments, count } = await fetchComments(req.params.id);
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
        allowed_formats: ["png"],
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

module.exports = router;
