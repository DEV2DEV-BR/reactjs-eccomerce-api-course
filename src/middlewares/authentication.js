const { decryptedToken } = require("../utils/token");

const AuthenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unset token!" });
  }

  try {
    const { userId } = await decryptedToken(authHeader);
    req.userId = userId;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports = AuthenticationMiddleware;
