const { JWT_SECRET } = require("../configs/config");

const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../utils/encrypt");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token") || req.query.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized", status: 401 });
  } else {
    try {
      const decoded = jwt.verify(decrypt(token), JWT_SECRET);
      req.user = await UserRepository.fetchMe(decoded.userId);
      if (!req.user)
        return res.status(401).json({ msg: "Unauthorized", status: 401 });
      next();
    } catch (error) {
      return res.status(403).json({ msg: "Unauthorized", status: 403 });
    }
  }
};

module.exports = auth;
