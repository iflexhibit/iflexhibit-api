const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const dataLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use("/auth", authLimiter, require("./dashboard/auth"));
router.use("/data", dataLimiter, require("./dashboard/data"));
router.use("/actions", dataLimiter, require("./dashboard/actions"));

module.exports = router;
