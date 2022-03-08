const express = require("express");
const authModerator = require("../../middlware/authModerator");
const authAdmin = require("../../middlware/authAdmin");
const DashboardRepository = require("../../repositories/DashboardRepository");

const router = express.Router();

router.post("/approvepost/:postId", authModerator, async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await DashboardRepository.approvePost(postId, req.user.id);
    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/rejectpost/:postId", authModerator, async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await DashboardRepository.rejectPost(postId, req.user.id);
    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/disablepost/:postId", authModerator, async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await DashboardRepository.disablePost(postId, req.user.id);
    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/disablecomment/:commentId", authModerator, async (req, res) => {
  const { commentId } = req.params;
  try {
    const result = await DashboardRepository.disableComment(commentId, userId);
    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    console.log("http error" + error);
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/banuser", authModerator, async (req, res) => {
  const { reportId, offenseId, banNote } = req.body;

  const newBan = {
    reportId,
    offenseId,
    banNote: banNote ? banNote.trim() : "",
    userId: req.user.id,
  };

  try {
    const result = await DashboardRepository.banUser(
      newBan.reportId,
      newBan.userId,
      newBan.offenseId,
      newBan.banNote
    );

    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/unbanuser/:banid", authModerator, async (req, res) => {
  try {
    const result = await DashboardRepository.unbanUser(
      req.params.banid,
      req.user.id
    );

    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/enablecomment/:commentid", authModerator, async (req, res) => {
  try {
    const result = await DashboardRepository.enableComment(
      req.params.commentid,
      req.user.id
    );

    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/clearreport/:id", authModerator, async (req, res) => {
  try {
    const result = await DashboardRepository.clearReport(
      req.params.id,
      req.user.id
    );

    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/promote/:type/:id", authAdmin, async (req, res) => {
  try {
    const result = await DashboardRepository.promoteUser(
      req.params.id,
      req.params.type,
      req.user.id
    );

    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

router.post("/demote/:type/:id", authAdmin, async (req, res) => {
  try {
    const result = await DashboardRepository.demoteUser(
      req.params.id,
      req.params.type,
      req.user.id
    );

    if (result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
});

module.exports = router;
