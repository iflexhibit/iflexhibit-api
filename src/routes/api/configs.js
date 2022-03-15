const express = require("express");
const auth = require("../../middlware/auth");
const router = express.Router();

const DashboardRepository = require("../../repositories/DashboardRepository");

router.get("/programs", async (req, res) => {
  try {
    const { degreePrograms } = await DashboardRepository.fetchPrograms();

    return res.status(200).json({ status: 200, programs: degreePrograms });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

module.exports = router;
