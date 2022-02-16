const express = require("express");
const authModerator = require("../../middlware/authModerator");
const authAdmin = require("../../middlware/authAdmin");
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

router.get("/disabled/:type", authModerator, async (req, res) => {
  const { type } = req.params;

  if (!["posts", "users", "comments"].includes(type))
    return res.status(200).json({ data: {} });

  try {
    let data;
    switch (type) {
      case "posts":
        data = await DashboardRepository.fetchDisabledPosts();
        break;
      case "users":
        data = await DashboardRepository.fetchBannedUsers();
        break;
      case "comments":
        data = await DashboardRepository.fetchDisabledComments();
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

router.get("/users/:type", authAdmin, async (req, res) => {
  if (!["ut2", "ut3"].includes(req.params.type))
    return res.status(200).json({ users: [] });
  try {
    const users = await DashboardRepository.fetchStaff(req.params.type);

    return res.status(200).json({ users: users || [] });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/search/:email", authAdmin, async (req, res) => {
  if (!req.params.email) return res.status(400).json({ user: null });
  try {
    const user = await DashboardRepository.fetchMember(req.params.email);

    if (!user) return res.status(404).json({ user });
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
