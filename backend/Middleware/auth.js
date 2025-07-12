const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  console.log("authmiddleware")
  const token = req.cookies.token;
  console.log("Token from cookies:", token); // Log the token

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "qwerty");
    console.log("Decoded token:", decoded);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(400).json({ message: "Invalid token" });
  }
};

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   console.log(token)

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, "qwerty");
//     console.log("Decoded token:", decoded);
//     req.user = decoded; 
//     console.log("fgfgf")
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error.message);
//     return res.status(400).json({ message: "Invalid token" });
//   }
// };

module.exports = authMiddleware;
