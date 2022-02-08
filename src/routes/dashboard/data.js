const express = require("express");
const authModerator = require("../../middlware/authModerator");
const DashboardRepository = require("../../repositories/DashboardRepository");

const router = express.Router();

router.get("/general", authModerator, async (req, res) => {
  try {
    const data = await DashboardRepository.fetchGeneralOverView();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/pending", authModerator, async (req, res) => {
  try {
    const data = await DashboardRepository.fetchPendingPosts();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/reports/:type", authModerator, async (req, res) => {
  const { type } = req.params;

  if (!["posts", "users", "comments"].includes(type))
    return res.status(200).json({ data: {} });

  try {
    let data;
    switch (type) {
      case "posts":
        data = await DashboardRepository.fetchReportedPosts();
        break;
      case "users":
        data = await DashboardRepository.fetchReportedUsers();
        break;
      case "comments":
        data = await DashboardRepository.fetchReportedComments();
        break;
      default:
        data = {};
        break;
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
