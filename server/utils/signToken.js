const jwt = require("jsonwebtoken");
module.exports = (_id, role) => {
  return jwt.sign({ id: _id, role }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
