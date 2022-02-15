const authAdmin = async (req, res, next) => {
  // Check if user exists
  if (!req.user) return res.sendStatus(401);
  // Check for administrator permissions
  if (!req.user.permissions.adminAccess) return res.sendStatus(403);
  next();
};

module.exports = authAdmin;
