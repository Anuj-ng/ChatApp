const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.id = decoded.id; 
    next();
  } catch (err) {}
};

module.exports = isAuthenticated;
