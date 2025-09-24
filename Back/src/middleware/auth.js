


// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("Token verify error:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = payload; // { id, role }
    next();
  });
}

module.exports = authenticateToken;
