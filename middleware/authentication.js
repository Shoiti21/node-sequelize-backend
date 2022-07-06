const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyTokenUser = (request, response, next) => {
  let token = request.headers["authorization"].replace('Bearer ','');
  if (!token) {
    return response.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return response.status(401).send({
        message: "Unauthorized",
      });
    }
    request.userId = decoded.id;
    next();
  });
};

const authJwt = {
    verifyTokenUser: verifyTokenUser,
};

module.exports = authJwt;
