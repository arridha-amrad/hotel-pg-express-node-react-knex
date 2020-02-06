const jwt = require("jsonwebtoken");
const { MY_CUSTOM_SECRET_KEY } = require("./config");

exports.generateToken = id => {
  return jwt.sign(
    {
      id
    },
    MY_CUSTOM_SECRET_KEY,
    {
      expiresIn: 360000
    }
  );
};
