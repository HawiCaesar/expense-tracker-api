const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  }
};
