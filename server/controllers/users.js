const Helper = require("./helpers");
const user = require("../models").user;

module.exports = {
  createUser(request, response) {
    if (!request.body.email || !request.body.password) {
      return response.status(400).send({ message: "Credentials missing" });
    }
    if (!Helper.isValidEmail(request.body.email)) {
      return response
        .status(400)
        .send({ message: "Please provide a valid email address" });
    }
    const clientHashedPassword = Helper.hashPassword(request.body.password);
    user
      .create({
        email: request.body.email,
        password: clientHashedPassword
      })
      .then(user => {
        const token = Helper.generateToken(user.dataValues.id);
        return response.status(201).send({
          message: "user created",
          token
        });
      })
      .catch(error => {
        if (error.original.routine === "_bt_check_unique") {
          return response
            .status(400)
            .send({ message: "User with that EMAIL already exists" });
        }
        return response.status(400).send({ message: "error", error });
      });
  },

  loginUser(request, response) {
    if (!request.body.email || !request.body.password) {
      return response.status(400).send({ message: "Credentials missing" });
    }
    if (!Helper.isValidEmail(request.body.email)) {
      return response
        .status(400)
        .send({ message: "Please provide a valid email address" });
    }

    user
      .findOne({
        where: {
          email: request.body.email
        }
      })
      .then(user => {
        if (
          Helper.comparePassword(
            request.body.password,
            user.dataValues.password
          )
        ) {
          const token = Helper.generateToken(user.dataValues.id);
          return response.status(200).send({ token });
        }
        return response.status(400).send({ message: "Incorrect credentials" });
      })
      .catch(error => {
        return response.status(400).send({ message: "Incorrect credentials" });
      });
  }
};
