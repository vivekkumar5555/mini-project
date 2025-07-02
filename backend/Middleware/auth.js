const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const jwttoken = token.replace("Bearer", "").trim();
  console.log("Token from header:", jwttoken);

  try {
    const decoded = jwt.verify(jwttoken, "qwerty");
    console.log("Decoded token:", decoded);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
