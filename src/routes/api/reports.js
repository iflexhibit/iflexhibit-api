const express = require("express");
const auth = require("../../middlware/auth");
const router = express.Router();

const ReportRepository = require("../../repositories/ReportRepository");

router.post("/comment", auth, async (req, res) => {
  const { targetCommentId, offenseId, reportNote } = req.body;
  if (!targetCommentId || !offenseId)
    return res.status(400).json({ status: 400, msg: "Bad request" });
  try {
    await ReportRepository.reportComment(
      targetCommentId,
      req.user.id,
      offenseId,
      reportNote
    );
    return res.status(200).json({ status: 200, msg: "Report submitted" });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.post("/post", auth, async (req, res) => {
  const { targetPostId, offenseId, reportNote } = req.body;
  console.log(req.body);
  if (!targetPostId || !offenseId)
    return res.status(400).json({ status: 400, msg: "Bad request" });
  try {
    await ReportRepository.reportPost(
      targetPostId,
      req.user.id,
      offenseId,
      reportNote
    );
    return res.status(200).json({ status: 200, msg: "Report submitted" });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

router.post("/user", auth, async (req, res) => {
  const { targetUserId, offenseId, reportNote } = req.body;
  if (!targetUserId || !offenseId)
    return res.status(400).json({ status: 400, msg: "Bad request" });
  try {
    await ReportRepository.reportUser(
      targetUserId,
      req.user.id,
      offenseId,
      reportNote
    );
    return res.status(200).json({ status: 200, msg: "Report submitted" });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

module.exports = router;
