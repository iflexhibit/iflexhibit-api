const express = require("express");
const router = express.Router();

const OffenseRepository = require("../../repositories/OffenseRepository");

router.get("/:type", async (req, res) => {
  const { type } = req.params;
  if (!type || !["c", "p", "u"].includes(type))
    return res.status(400).json({ status: 400, msg: "Bad request" });
  try {
    const { offenses } = await OffenseRepository.fetchOffenses(type);
    return res.status(200).json({ status: 200, offenses });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Something went wrong" });
  }
});

module.exports = router;
