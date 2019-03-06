const jwt = require("jsonwebtoken");
const userModel = require("../models").user;

module.exports = {
  verifyToken(request, response, next) {
    const receivedToken = request.headers["x-access-token"];

    if (!receivedToken) {
      return response.status(400).send({
        message: "Token is not provided"
      });
    }

    try {
      decodedToken = jwt.verify(receivedToken, process.env.JWT_SECRET);
      userModel
        .findOne({
          where: {
            id: decodedToken.userId
          }
        })
        .then(user => {
          if (!user) {
            return response.status(400).send({
              message: "Invalid token"
            });
          }
          request.user = { id: decodedToken.userId };
          next();
        });
    } catch (error) {
      return response.status(400).send(error);
    }
  }
};
