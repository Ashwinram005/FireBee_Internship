const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return next(); // If no token is found, proceed with login
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    return res.status(400).json({ message: "You are already logged in!" });
  } catch (error) {
    return next(); // If token is invalid/expired, proceed with login
  }
};

module.exports = verifyToken;
