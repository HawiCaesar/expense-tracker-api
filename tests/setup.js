require("dotenv").config();
const jwt = require("jsonwebtoken");
const Helper = require("../server/controllers/helpers");
const User = require("../server/models").user;

const testUsers = [
  {
    email: "test1@test.com",
    password: Helper.hashPassword("password123"),
    token: jwt.sign(
      {
        userId: 1
      },
      process.env.JWT_SECRET
    )
  },
  {
    email: "test2@test.com",
    password: Helper.hashPassword("password1234"),
    token: jwt.sign(
      {
        userId: 2
      },
      process.env.JWT_SECRET
    )
  }
];
module.exports = {
  testUsers,
  createUser(user) {
    return User.bulkCreate(user, { returning: true }).then(user => {
      //console.log("created ******", user);
    });
  }
};
