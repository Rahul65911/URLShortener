const jwt = require("jsonwebtoken");

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    "SecretKey"
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, "SecretKey");
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
