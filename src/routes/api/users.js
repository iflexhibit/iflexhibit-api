const express = require("express");
const UserRepository = require("../../repositories/UserRepository");

const router = express.Router();

router.get("/user", async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  try {
    const user = await UserRepository.fetchProfile(req.user.userId);
    if (!user) return res.sendStatus(401);
    return res.status(200).json({ user });
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
