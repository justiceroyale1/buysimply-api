const jwt = require("jsonwebtoken");
const config = require("../config");
const data = require("../lib/data");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  var expiredToken = data.getExpiredToken(token);

  if (!token) return res.status(401).json({ error: "Access denied" });
  if (expiredToken) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, config.secret);
    console.log('role', decoded.role);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
