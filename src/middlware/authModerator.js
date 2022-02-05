const authModerator = async (req, res, next) => {
  // Check if user exists
  if (!req.user) return res.sendStatus(401);
  // Check for moderator permissions
  if (!req.user.permissions.moderatorAccess) return res.sendStatus(403);
  next();
};

module.exports = authModerator;
