const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const basicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/", basicLimiter, (req, res) => res.send("API"));
router.use("/offenses", basicLimiter, require("./api/offenses"));
router.use("/users", basicLimiter, require("./api/users"));
router.use("/posts", basicLimiter, require("./api/posts"));
router.use("/auth", basicLimiter, require("./api/auth"));
router.use("/reports", basicLimiter, require("./api/reports"));
router.use("/configs", basicLimiter, require("./api/configs"));

module.exports = router;
