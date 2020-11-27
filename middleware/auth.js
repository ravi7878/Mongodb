const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(404).json({ msg: "No token, authorization denied " });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, "my tocken");
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
