const jwt = require("jsonwebtoken");
exports.verifyToken = function (req, res, next) {
  try {
    let token = req.header("Authorization");
    if (token && token?.startsWith("Bearer")) {
      token = token?.split(" ")?.[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.data = decoded.data;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
