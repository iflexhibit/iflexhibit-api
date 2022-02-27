const { JWT_SECRET } = require("../configs/config");

const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../utils/encrypt");

const auth = async (req, res, next) => {
  const token = req.headers["x-auth-token"] || req.query.token;
  if (!token) {
    return res.status(401).json({ msg: "Missing token", status: 401 });
  } else {
    try {
      const decoded = jwt.verify(decrypt(token), JWT_SECRET);
      req.user = await UserRepository.fetchMe(decoded.id);
      if (!req.user)
        return res.status(401).json({ msg: "Invalid user", status: 401 });
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Invalid token", status: 401 });
    }
  }
};

module.exports = auth;
