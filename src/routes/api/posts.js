const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const auth = require("../../middlware/auth");
const { cloudinary } = require("../../configs/cloudinary");
const PostRepository = require("../../repositories/PostRepository");
const router = express.Router();

router.get("/", async (req, res) => {
  const { title, tags, sort, page } = req.query;
  try {
    const { posts, count } = await PostRepository.fetchApprovedPosts(
      title,
      tags,
      sort,
      page
    );
    return res.status(200).json({ status: 200, results: count, posts });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await PostRepository.fetchApprovedPost(req.params.id);
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
    const { comments, count } = await PostRepository.fetchPostComments(
      req.params.id
    );
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
  let isVideo = false;

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res
        .status(500)
        .json({ status: 500, msg: "Something went wrong", error: err });

    if (!req.user.permissions.submitPost)
      return res
        .status(403)
        .json({ status: 403, msg: "You are currently banned" });

    if (Object.keys(files).length === 0)
      return res.status(400).json({ status: 400, msg: "Image required" });

    if (!["image/jpeg", "image/png"].includes(files.imageFile.type)) {
      return res
        .status(400)
        .json({ status: 400, msg: "Invalid image file type" });
    }

    if (files.videoFile && !["video/mp4"].includes(files.videoFile.type)) {
      return res
        .status(400)
        .json({ status: 400, msg: "Invalid video file type" });
    }

    if (!fields.title) {
      return res.status(400).json({ status: 400, msg: "Title required" });
    }

    if (!fields.title.trim().length > 0) {
      return res.status(400).json({ status: 400, msg: "Title required" });
    }

    if (fields.description) {
      if (fields.description.trim().length > 1000) {
        return res.status(400).json({
          status: 400,
          msg: "Description cannot exceed 1000 characters",
        });
      }
    }

    if (files.videoFile) isVideo = true;

    try {
      if (isVideo && files.videoFile.size > 100000000) {
        return res.status(400).json({
          status: 400,
          msg: "Video must not exceed 100 MB",
        });
      }

      if (isVideo && files.imageFile.size > 10000000) {
        return res.status(400).json({
          status: 400,
          msg: "Image must not exceed 10 MB",
        });
      }
      let videoResponse;
      if (isVideo)
        videoResponse = await cloudinary.uploader.upload(files.videoFile.path, {
          folder: "iflexhibit/uploads",
          upload_preset: "iflexhibit",
          allowed_formats: ["mp4"],
          resource_type: "video",
        });

      const imageResponse = await cloudinary.uploader.upload(
        files.imageFile.path,
        {
          folder: "iflexhibit/uploads",
          upload_preset: "iflexhibit",
          allowed_formats: ["png", "jpg"],
          transformation:
            fields.watermark === "true"
              ? [
                  { height: 720, quality: "auto", crop: "scale" },
                  {
                    overlay: "black_bar",
                    gravity: "south",
                    width: "1.0",
                    height: "0.0625",
                    flags: "relative",
                    opacity: 60,
                  },
                  {
                    overlay: {
                      font_family: "Rubik",
                      font_size: 20,
                      text: `Posted on iFlexhibit by ${req.user.username}`,
                    },
                    gravity: "south_west",
                    y: 8,
                    x: 10,
                    color: "#eee",
                  },
                ]
              : [{ height: 720, quality: "auto", crop: "scale" }],
        }
      );

      const post = await PostRepository.insertPost(
        req.user.id,
        fields.title.trim(),
        fields.description ? fields.description.trim() : null,
        imageResponse.secure_url,
        isVideo ? videoResponse.secure_url : null,
        fields.tags
      );

      return res.status(201).json({ status: 201, post });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, msg: "Something went wrong", error });
    } finally {
      files.imageFile && fs.unlinkSync(files.imageFile.path);
      files.videoFile && fs.unlinkSync(files.videoFile.path);
    }
  });
});

router.post("/view/:id", auth, async (req, res) => {
  if (!req.params.id || isNaN(parseInt(req.params.id)))
    return res.sendStatus(400);
  try {
    await PostRepository.viewPost(req.user.id, req.params.id);
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
    await PostRepository.likePost(req.user.id, req.params.id);
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
    const isLiked = await PostRepository.fetchUserPostInteraction(
      req.user.id,
      req.params.id
    );
    return res.status(200).json({ isLiked });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ status: 400, msg: "Missing post parameter" });
  try {
    const result = await PostRepository.deletePost(id, req.user.id);
    if (result)
      return res
        .status(200)
        .json({ status: 200, msg: "Post successfully deleted" });
    return res
      .status(400)
      .json({ status: 400, msg: "Unable to delete post at this moment" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong", error });
  }
});

module.exports = router;
