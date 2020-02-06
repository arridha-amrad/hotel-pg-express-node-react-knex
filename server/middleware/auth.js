const jwt = require("jsonwebtoken");
const { MY_CUSTOM_SECRET_KEY } = require("../config");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("secret-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization is denied" });
  }
  // console.log(token);
  try {
    const decoded = jwt.verify(token, MY_CUSTOM_SECRET_KEY);
    id = decoded.id;
    // console.log("Output middleware", id);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
