const { JWT_SECRET } = require("../configs/config");

const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token") || req.query.token;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized", status: 401 });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      req.user = await UserRepository.fetchProfile(decoded.userId);
      next();
    } catch (error) {
      return res.status(400).json({ msg: "Invalid token", status: 400 });
    }
  }
};

module.exports = auth;
