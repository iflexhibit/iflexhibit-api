const express = require("express");
const auth = require("../../middlware/auth");
const router = express.Router();

router.get("/user", auth, async (req, res) => {
  return res.status(200).json({ status: 200, user: req.user });
});

module.exports = router;
