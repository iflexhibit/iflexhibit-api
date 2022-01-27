const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const passport = require("passport");
const { google, NODE_ENV, JWT_SECRET } = require("../../configs/config");

const CLIENT_URL =
  NODE_ENV === "production"
    ? "https://iflexhibit.com"
    : "http://localhost:3000";

router.get(
  "/google",
  passport.authenticate("google", { session: false, scope: google.SCOPE })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: CLIENT_URL + "/login",
    session: false,
  }),
  async (req, res) => {
    if (!req.user) return res.redirect(CLIENT_URL + "/login");

    const token = jwt.sign(req.user, JWT_SECRET, { expiresIn: "7d" });
    return res.redirect(CLIENT_URL + "/api/auth?token=" + token);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
