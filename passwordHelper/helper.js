const requireSignin = (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ error: "Authentication required", signinRequired: true });
  }
  // Optionally update last activity timestamp
  req.session.user.lastActivity = new Date();
  next();
};

module.exports = { requireSignin };
