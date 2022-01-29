const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("API"));
router.use("/offenses", require("./api/offenses"));
router.use("/users", require("./api/users"));
router.use("/posts", require("./api/posts"));
router.use("/auth", require("./api/auth"));
router.use("/reports", require("./api/reports"));

module.exports = router;
