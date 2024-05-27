const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  //   console.log(authHeader);
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("that part");
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.userinfo.username;
    req.roles = decoded.userinfo.roles;
    next();
  });
});

module.exports = verifyToken;
