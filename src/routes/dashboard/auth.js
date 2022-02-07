const express = require("express");
const router = express.Router();

const passport = require("passport");
const { google } = require("../../configs/config");

router.get(
  "/google",
  passport.authenticate("google-dashboard", { scope: google.SCOPE })
);

router.get(
  "/google/callback",
  passport.authenticate("google-dashboard", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get("/me", (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
