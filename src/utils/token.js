const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const decryptedToken = async (authHeader) => {
  const [, token] = authHeader.split(" ");

  return promisify(jwt.verify)(token, "TOKEN_SECRET");
};

module.exports = { decryptedToken };
