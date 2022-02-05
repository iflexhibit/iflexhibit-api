const authModerator = async (req, res, next) => {
  // Check if user exists
  if (!req.user) return res.redirect("/login");
  // Check for moderator permissions
  if (!req.user.permissions.moderatorAccess) return res.redirect("/login");
  next();
};

module.exports = authModerator;
