const express = require("express");
const router = express.Router();

const passport = require("passport");
const { google } = require("../../configs/config");

router.get("/google", passport.authenticate("google", { scope: google.SCOPE }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://iflexhibit.com/",
    failureRedirect: "https://iflexhibit.com/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("https://iflexhibit.com/");
});

module.exports = router;
