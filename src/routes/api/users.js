const express = require("express");
const UserRepository = require("../../repositories/UserRepository");

const router = express.Router();

router.get("/user", async (req, res) => {
  console.log(req.sessionID);
  if (!req.user) {
    return res.status(401).json({ status: 401 });
  }
  try {
    const user = await UserRepository.fetchProfile(req.user.userId);
    if (!user) return res.status(401).json({ status: 401 });
    return res.status(200).json({ status: 200, user }).end();
  } catch (error) {
    return res.status(500).json({ status: 500 }).end();
  }
});

module.exports = router;
