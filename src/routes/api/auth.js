const express = require("express");
const router = express.Router();

const passport = require("passport");
const { google, NODE_ENV } = require("../../configs/config");

const CLIENT_URL =
  NODE_ENV === "production"
    ? "https://iflexhibit.com"
    : "http://localhost:3000";

router.get("/google", passport.authenticate("google", { scope: google.SCOPE }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL + "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
