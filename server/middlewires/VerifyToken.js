const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.user; // Attach user object to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
