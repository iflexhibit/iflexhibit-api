const express = require("express");
const router = express.Router();

const passport = require("passport");
const { google } = require("../../configs/config");

router.get("/google", passport.authenticate("google", { scope: google.SCOPE }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
