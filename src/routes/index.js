const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("API"));
router.use("/users", require("./api/users"));
router.use("/auth", require("./api/auth"));

module.exports = router;
